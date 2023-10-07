import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmationDialog = ({ 
  open, 
  handleClose, 
  title, 
  actions = [], // NEW: Dynamic actions
  children // NEW: Using children for dialog content
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children} {/* NEW: Using children instead of content prop */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map((action, index) => (
          <Button 
            key={index} 
            onClick={action.onClick} 
            color="primary">
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
