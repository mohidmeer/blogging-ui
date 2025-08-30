// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//     DialogClose
// } from "../components/ui/dialog"



// const Modal = ({id='close-dialog', children, content, title }: {id:string, children: any, content: any, title: string }) => {
//     return (
//         <Dialog >
//             <DialogTrigger>
//                 {children}
//             </DialogTrigger>
//             <DialogContent className="modals">
//                 <DialogHeader>
//                     <DialogTitle >{title}</DialogTitle>
//                     <DialogClose className="modal" id={id}/>
//                 </DialogHeader>
//                 {content}
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default Modal



import React, { useState } from "react"

interface ModalProps {
  id?: string
  title: string
  children: React.ReactNode
  content: React.ReactNode
}

const Modal = ({ id = "close-dialog", title, children, content }: ModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="">
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-11/12 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button
                id={id}
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-4">{content}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal