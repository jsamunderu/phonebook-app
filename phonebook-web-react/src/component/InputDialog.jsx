import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { StyledModal } from "./style";
import EntryDataService from '../service/EntryDataService';

const modalRoot = document.getElementById("modal-root");

function Portal({ children }) {
    const [element] = useState(document.createElement("div"));

    useEffect(() => {
        modalRoot.appendChild(element);

        return function cleanup() {
            modalRoot.removeChild(element);
        };
    }, [modalRoot, element]);

    return createPortal(children, element);
}

function Modal({ children, toggle, open }) {
    return (
        <Portal>
            {open && (
                <StyledModal.ModalWrapper onClick={toggle}>
                    <StyledModal.ModalBody onClick={event => event.stopPropagation()}>
                        <StyledModal.CloseButton onClick={toggle}>
                            &times;
                        </StyledModal.CloseButton>
                        {children}
                    </StyledModal.ModalBody>
                </StyledModal.ModalWrapper>
            )}
        </Portal>
    );
}

class InputDialog extends React.Component {
    constructor(props) {
        super(props)

        console.log("%%%%%%%%%%%%%%%%%%%%%%% " + this.props.show);

        this.state = {
             name: "",
             phoneNumber: this.props.match.params.phoneNumber
        }
        this.props.init();
        console.log("===========" + JSON.stringify(this.props.match.params))
    }

    componentDidMount() {
        if (!this.state.phoneNumber) {
            return
        }
        console.log("@@@@@@@@@@@" + this.state.phoneNumber.length)

        let data = {
            name: this.state.phoneNumber
        }

        EntryDataService.retrieveEntry(data)
            .then(response => this.setState({
                name: response.data[0].name,
                phoneNumber: response.data[0].phoneNumber
            }))
    }

    validate = (values) => {
        let errors = {}
        if (!values.name) {
            errors.name = 'Enter a Name'
        } else if (values.phoneNumber.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Phone Number'
        }

        return errors
    }

    onHide = () => {
        console.log("this.onHide #####################");
        Promise.resolve(this.props.onHide())
            .then(() => this.props.history.push('/'));
    }

    onSubmit = (values) => {
        if (!this.state.phoneNumber) {
            let data = [{
                name: values.name,
                phoneNumber: values.phoneNumber
            }]

            Promise.resolve(EntryDataService.createEntry(data)).then(() => this.props.history.push('/'));
        } else {
            let data = [{
                oldPhoneNumber: this.state.phoneNumber,
                newName: values.name,
                newPhoneNumber: values.phoneNumber
            }]

            Promise.resolve(EntryDataService.updateEntry(data)).then(() => this.props.history.push('/'));
        }

        console.log(values);
    }

    render() {
        let { name, phoneNumber } = this.state

        return (
            <div className="InputDialog">
                <Modal open={this.props.show} toggle={this.onHide}>
                     <Formik
                        initialValues={{ name, phoneNumber }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                     >
                         {
                             (props) => (
                                 <Form>
                                     <ErrorMessage name="description" component="div"
                                         className="alert alert-warning" />
                                     <fieldset className="form-group">
                                         <label>Name</label>
                                         <Field className="form-control" type="text" name="name" />
                                     </fieldset>
                                     <fieldset className="form-group">
                                         <label>Phone Number</label>
                                         <Field className="form-control" type="text" name="phoneNumber" />
                                     </fieldset>
                                     <button className="btn btn-success" type="submit">Save</button>
                                 </Form>
                             )
                         }
                     </Formik>
                </Modal>
            </div>
        );
    }
}

export default InputDialog
