import * as m from 'mithril'
import A11yDialog from 'a11y-dialog'

import { BaseComponent, elementAttrs } from "./base"

type Attrs = {
    id: string
    style?: "full" | "default"
}

export function getDialog(id: string) : A11yDialog {
    return new A11yDialog(document.getElementById(id))
}

// https://a11y-dialog.netlify.app/usage/markup
export default function() : BaseComponent<Attrs> {
    return {
        ...elementAttrs,
        oncreate: (vnode) => {
            // this initializes all the library js
            getDialog(vnode.attrs.id)
        },
        view: (vnode) => {
            let { id, style } = vnode.attrs
            style = style ? style : "default"
            return (
                <div 
                    id={id}
                    className={`dialog_container dialog_container-${style}`} 
                    data-a11y-dialog={id} 
                    aria-labelledby="your-dialog-title-id" 
                    aria-hidden="true"
                >   
                { style == "default" && 
                    [
                    <div className="dialog_overlay" data-a11y-dialog-hide></div>,
                    <div className="dialog_content dialog_content-default" role="document">
                        <a className="dialog_close" data-a11y-dialog-hide aria-label="Close dialog">&times;</a>
                        { vnode.children }
                    </div>
                    ]
                }
                { style == "full" &&
                    <div className="dialog_content dialog_content-full">
                        {vnode.children}
                    </div>
                }
                </div>
            )
        }
    }
}