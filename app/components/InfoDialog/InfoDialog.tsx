import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../../components/ui/alert-dialog";

interface InfoDialogType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle: string;
  modalText?: string;
}

/**
 * This component is a modal component with a simple info text and a close button
 * @param {InfoDialogType} props - component props
 * @param {boolean} props.showModal
 * @param {string} props.modalText -
 * @param {string} props.modalTitle -
 * @retrun {ReactElement}
 * */
export function InfoDialog({
  showModal,
  setShowModal,
  modalTitle,
  modalText,
}: InfoDialogType) {
  function handleClose() {
    setShowModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  return (
    <AlertDialog open={showModal} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle data-testid="modal-created">
            {modalTitle}
          </AlertDialogTitle>
          <AlertDialogDescription>{modalText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction data-testid="modal-close">Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
