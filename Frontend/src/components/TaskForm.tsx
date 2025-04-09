import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../Styles/TaskForm.css";


interface TaskFormProps {
    createTask: (title: string, description: string) => void;
}

function TaskForm({createTask}: TaskFormProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (title.trim() === "") {
            return;
        }
        createTask(title, description);
        setOpen(false);
        setTitle("");
        setDescription("");

        setTimeout(() => {
            setOpen(false);
        }, 100);
    };

    return (
        <>
        {/* Button to open the dialog */}
        <Fab
            className="fabButton"
            aria-label="add"
            onClick={() => setOpen(true)}
            sx={{ position: "fixed", right: 20, bottom: 20 }}
        >
            <AddIcon />
        </Fab>

        {/* Dialog for creating a new task */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth 
        sx={{
            "& .MuiDialog-paper": {
            backgroundColor: "#2c2c2c", // Dark gray background
            color: "white", // White text
            borderRadius: "20px",
            },
        }}>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogContent className="taskFormContainer">
                <TextField
                    className="taskFormInput"
                    label="Title"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        "& label": { color: "white" },
                        "& .MuiInputBase-root": { color: "white" },
                    }}
                />
                <TextField
                    className="taskFormInput"
                    label="Description"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        "& label": { color: "white" },
                        "& .MuiInputBase-root": { color: "white" },
                    }}
                />
            </DialogContent>
            <DialogActions className="taskFormActions">
                <Button  onClick={() => setOpen(false)} className="formButton">Cancel</Button>
                <Button  onClick={handleSubmit} className="formButton">Create</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default TaskForm;