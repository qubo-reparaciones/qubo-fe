import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import _ from 'lodash';
import React from 'react';
import { toast } from 'react-toastify';

import CustomerService from '../services/CustomerService.js';

class CustomerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCustomer: {
        name: '',
        lastname: '',
        dni: '',
        phoneNumber: '',
        email: ''
      },
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ newCustomer: _.set(this.state.newCustomer, e.target.id, e.target.value) });
  };

  onRegisterSubmit = (event) => {
    CustomerService.register(this.state.newCustomer)
      .then((response) => {
        if(response.ok) {
          response.json().then((body) => {
            const vody = JSON.stringify(body);
            console.log('Body: ' + vody);
            this.showOnSuccessful("¡Bienvenide " + body.name + " " + body.lastname);
          });
        } else {
          console.log(JSON.stringify(response));
          response.json().then((error) => this.showOnError(error.message));
        }
      }).catch(error => {
      console.log(JSON.stringify(error));
      this.showOnError(error.message);
    });
  };

  showOnSuccessful(message) {
    toast.success(message, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }

  showOnError(message) {
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }

  onKeyDown = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.onRegisterSubmit(event);
    }
  };

  render() {
    const { newCustomer, errors } = this.state;
    console.log('customer: ' + JSON.stringify(newCustomer));
    const { theme } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div style={{ marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar style={{ margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main }}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Datos del cliente
          </Typography>
          <form style={{ width: '100%', marginTop: theme.spacing(3) }} noValidate onKeyDown={this.onKeyDown}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={newCustomer.name}
                  error={errors.name}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={newCustomer.lastname}
                  error={errors.lastname}
                  autoComplete="flastname"
                  name="lastname"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Apellido"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={newCustomer.dni}
                  error={errors.dni}
                  name="dni"
                  variant="outlined"
                  required
                  fullWidth
                  id="dni"
                  label="Dni"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={newCustomer.phoneNumber}
                  error={errors.phoneNumber}
                  name="phoneNumber"
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Celular"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  value={newCustomer.email}
                  error={errors.email}
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              onClick={this.onRegisterSubmit}
              style={{ margin: theme.spacing(3, 0, 2) }}
              fullWidth
              variant="contained"
              color="primary">
              REGISTRAR
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withTheme(CustomerRegister);