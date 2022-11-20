import React from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    Swal.fire({
        icon: `${alert.alertType}`,
        title: 'Oops...',
        text: `${alert.msg}`,
      })
));


const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);