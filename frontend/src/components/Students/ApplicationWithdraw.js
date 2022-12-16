/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/components/Students/ApplicationWithdraw.module.css';

const ApplicationWithdraw = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNote = (event) => {
        setNote(event.target.value);
    };

    const resetForm = () => {
        setNote('');
    };

    const checkButtonDisable = () => {
        if (note === '') {
            return true;
        }
        return false;
    };

    const handleApplicationWithdrawl = () => {
        console.log(note);
    }

    const descriptionElementRef = React.useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <button
                className={styles.withdrawButton}
                onClick={() => handleClickOpen()}
            >
                Withdraw
            </button>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={() => handleClose()}
                scroll="paper"
                aria-labelledby={data.id}
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id={data.id}>
                    <div className={styles.header}>Withdraw Application</div>
                </DialogTitle>
                <DialogContent dividers="true">
                    <Form>
                        <Form.Group className="mb-3" controlId="Withdraw Application">
                            <Form.Label className={styles.notes}>
                                Why do you want to withdraw this application?
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                value={note}
                                className={styles.notesTextArea}
                                rows={4}
                                onChange={(event) => handleNote(event)}
                            />
                        </Form.Group>
                        <div className={styles.projectActions}>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={() => resetForm()}
                            >
                                Clear
                            </Button>
                            <Button
                                className={styles.submitButton}
                                variant="primary"
                                type="submit"
                                disabled={checkButtonDisable()}
                                onClick={() => handleApplicationWithdrawl()}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ApplicationWithdraw;
