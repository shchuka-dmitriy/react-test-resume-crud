import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField'

const FormInput = (props) => {
    const { label, classes, input, type, meta: {touched, active, error} } = props;
    const inputClassName = classNames(classes.input, {
        [classes.valid]: active && !error,
        [classes.notValid]: touched && error
    });

    const renderInput = () => {
        if (type === 'textArea') {
            return <TextField {...input} variant="outlined" fullWidth label={label} placeholder={label}
                              rows={10} className={ inputClassName } multiline/>
        } else {
            return <TextField {...input} variant="outlined" fullWidth label={label} placeholder={label} type={type}
                              className={ inputClassName }/>
        }
    }

    return (
        <div className={classes.container}>
            {
                renderInput()
            }

            {classes.warning && (touched && (error && <span className={classes.warning}>{error}</span>))}
        </div>
    )
};

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    classes: PropTypes.shape({
        container: PropTypes.string,
        input: PropTypes.string,
        valid: PropTypes.string,
        notValid: PropTypes.string,
        warning: PropTypes.string
    })
};

export default FormInput;