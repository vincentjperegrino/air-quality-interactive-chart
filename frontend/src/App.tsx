import { useState, useEffect } from "react";
import { useAirQualityData } from "./hooks/useAirQualityData";
import { ParameterSelector } from "./components/ParameterSelector";
import { DateRangePicker } from "./components/DateRangePicker";
import { AirQualityChart } from "./components/AirQualityChart";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { subMonths } from "date-fns";
import axios from "axios";
import { BASE_URL } from './lib/contants';

function App() {
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameter, setSelectedParameter] = useState("co");
  const [startDate, setStartDate] = useState<Date | null>(subMonths(new Date(), 1));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { data, loading } = useAirQualityData(
    selectedParameter,
    startDate || undefined,
    endDate || undefined
  );

  useEffect(() => {
    axios
      .get<string[]>(`${BASE_URL}/data/parameters`)
      .then((response) => setParameters(response.data))
      .catch(console.error);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ paddingTop: '4rem' }}>
        Air Quality Dashboard
      </Typography>

      {/* Parameter selector and date range picker*/}
      <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "center", position: 'sticky', top: 0}}>
        <ParameterSelector
          parameters={parameters}
          selectedParameter={selectedParameter}
          onParameterChange={setSelectedParameter}
        />
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </Box>

      {/* Chart or loading spinner */}
      <Box sx={{ position: "relative", height: '60vh' }}>
        {loading ? (
          <Box sx={{
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: '100%', 
            height: '100%'
          }}>
            <CircularProgress />
          </Box>
        ) : (
          <AirQualityChart data={data} parameter={selectedParameter} />
        )}
      </Box>
    </Container>
  );
}

export default App;