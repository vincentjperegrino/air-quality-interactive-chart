import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={onStartDateChange}
        slots={{ textField: TextField }}
        slotProps={{ textField: { variant: 'outlined', sx: { width: '200px' } } }}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={onEndDateChange}
        slots={{ textField: TextField }}
        slotProps={{ textField: { variant: 'outlined', sx: { width: '200px' } } }}
      />
    </div>
  </LocalizationProvider>
);