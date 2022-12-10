import React from 'react';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';

const Alerts = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <Alert key={alert.id} variant="outlined" severity={alert.alertType}>
        {alert.msg}
    </Alert>
));

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);