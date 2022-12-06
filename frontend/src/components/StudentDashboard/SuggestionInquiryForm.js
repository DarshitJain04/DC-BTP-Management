import React, { useState, useEffect } from 'react';
import instance from '../../api/axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SuggestionInquiryForm({ p1, p2 }) {
  const [SuggestionRecipient, setSuggestionRecipient] = useState([]);
  const [InquiryRecipient, setInquiryRecipient] = useState([]);
  useEffect(() => {
    instance
      .get('main/office_mails/')
      .then((res) => {
        setSuggestionRecipient(
          res.data.filter((Data) =>
            Data.category.includes('Suggestion Recipient')
          )
        );
        setInquiryRecipient(
          res.data.filter((Data) => Data.category.includes('Inquiry Recipient'))
        );
      })
      .catch((error) => console.log(error));
  }, []);
  const handleChangecat = (event) => {
    p2({ ...p1, ...{ category: event.target.value } });
  };
  const handleChangesubject = (event) => {
    p2({ ...p1, ...{ subject: event.target.value } });
  };
  const handleChangetext = (event) => {
    p2({ ...p1, ...{ text: event.target.value } });
  };
  const handleChangesendto = (event) => {
    p2({ ...p1, ...{ sendto: event.target.value } });
  };
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category *</InputLabel>
            <Select fullWidth value={p1.category} onChange={handleChangecat}>
              <MenuItem value="Suggestion">Suggestion</MenuItem>
              <MenuItem value="Inquiry">Inquiry</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Send to *</InputLabel>
            <Select fullWidth value={p1.sendto} onChange={handleChangesendto}>
              <ListSubheader>Suggestion</ListSubheader>
              {SuggestionRecipient.map((obj) => {
                return (
                  <MenuItem key={obj.id} value={obj.email}>
                    {obj.name}
                  </MenuItem>
                );
              })}
              <ListSubheader>Inquiry</ListSubheader>
              {InquiryRecipient.map((obj) => {
                return (
                  <MenuItem key={obj.id} value={obj.email}>
                    {obj.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="subject"
            name="subject"
            label=" subject"
            fullWidth
            multiline
            rowsMax={4}
            autoComplete=" subject"
            value={p1.subject}
            onChange={handleChangesubject}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="text"
            name="text"
            label=" text"
            fullWidth
            multiline
            rowsMax={12}
            autoComplete=" text"
            value={p1.text}
            onChange={handleChangetext}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
