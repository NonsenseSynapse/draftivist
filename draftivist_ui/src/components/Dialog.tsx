import * as m from 'mithril'
import A11yDialog from 'a11y-dialog'

import { BaseComponent, elementAttrs } from "./base"

type Attrs = {
    id: string
}

export function getDialog(id: string) : A11yDialog {
    return new A11yDialog(document.getElementById(id))
}

// https://a11y-dialog.netlify.app/usage/markup
export default function() : BaseComponent<Attrs> {
    return {
        ...elementAttrs,
        oncreate: (vnode) => {
            getDialog(vnode.attrs.id)
        },
        view: (vnode) => (
            <div 
                id={vnode.attrs.id}
                className="dialog_container" 
                data-a11y-dialog={vnode.attrs.id} 
                aria-labelledby="your-dialog-title-id" 
                aria-hidden="true"
            >
                <div className="dialog_overlay" data-a11y-dialog-hide></div>
                <div className="dialog_content" role="document">
                    <a className="dialog_close" data-a11y-dialog-hide aria-label="Close dialog">&times;</a>
                    { vnode.children }
                </div>
            </div>
        )
    }
}