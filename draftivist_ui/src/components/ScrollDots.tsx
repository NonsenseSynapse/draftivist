import * as m from "mithril";
import { BaseComponent, elementAttrs } from "./base"

type Attrs = {
    count: number
    index: number
    shouldDisplay: boolean
}

/*
TODO:
- style this
- expand on comments in ScrollHelper
*/

export default function (): BaseComponent<Attrs> {

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { index } = vnode.attrs
            return (
                <div>{index}</div>
            )
        }
    }

}