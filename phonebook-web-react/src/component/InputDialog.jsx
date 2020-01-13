import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { StyledModal } from "./style";

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
    }

    componentDidMount = () => {
    }

    validate = (values) =>{
        let errors = {}
        if (!values.name) {
            errors.name = 'Enter a Name'
        } else if (values.phoneNumber.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Phone Number'
        }

        return errors
    }

    onHide = () => {
        Promise.resolve(this.props.onHide()).then(() => this.props.history.push('/entries'));
    }

    onSubmit = (values) => {
       //let username = INSTRUCTOR

       // if (this.state.id === -1) {
            //CourseDataService.createCourse(username, course)
            //    .then(() => this.props.history.push('/courses'))
        //} else {
            //CourseDataService.updateCourse(username, this.state.id, course)
            //    .then(() => this.props.history.push('/courses'))
        //}

        console.log(values);
    }

    render() {
        return (
            <div className="InputDialog">
                <Modal open={this.props.show} toggle={this.onHide}>
                     <Formik
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
                                         <Field className="form-control" type="text" name="name" disabled />
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
