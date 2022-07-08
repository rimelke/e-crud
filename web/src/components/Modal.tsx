import { PropsWithChildren } from 'react'
import RModal from 'react-modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
}

RModal.setAppElement('#__next')

const Modal = ({
  isOpen,
  onClose,
  children,
  title
}: PropsWithChildren<Props>) => (
  <RModal
    isOpen={isOpen}
    onRequestClose={onClose}
    overlayClassName="flex items-center justify-center fixed inset-0 bg-black bg-opacity-10"
    className="min-w-120 bg-white rounded-lg p-4 flex flex-col gap-4 outline-none">
    <div className="flex items-center justify-between">
      <h2 className="text-indigo-500 text-2xl font-medium">{title}</h2>
      <span className="text-slate-400 font-medium text-xl" onClick={onClose}>
        X
      </span>
    </div>
    {children}
  </RModal>
)

export default Modal
