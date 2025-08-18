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
  modalTitle,
  modalText,
}: InfoDialogType) {
  return (
    <AlertDialog open={showModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{modalTitle}</AlertDialogTitle>
          <AlertDialogDescription>{modalText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              window.location.reload();
            }}
          >
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
