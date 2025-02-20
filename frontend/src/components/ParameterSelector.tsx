import { MenuItem, Select, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';

interface ParameterSelectorProps {
  parameters: string[];
  selectedParameter: string;
  onParameterChange: (param: string) => void;
}

export const ParameterSelector = ({ 
  parameters, 
  selectedParameter, 
  onParameterChange 
}: ParameterSelectorProps) => (
  <FormControl sx={{ width: '200px' }}>
    <InputLabel>Parameter</InputLabel>
    <Select
      value={selectedParameter}
      label="Parameter"
      onChange={(e: SelectChangeEvent) => onParameterChange(e.target.value)}
    >
      {parameters.map((param) => (
        <MenuItem key={param} value={param}>
          {param.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);