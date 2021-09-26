import * as m from "mithril";
import { BaseComponent, elementAttrs } from "./base"

type Attrs = {
    count: number
    index: number
    shouldDisplay: boolean
}

export default function (): BaseComponent<Attrs> {

    return {
        ...elementAttrs,
        view: (vnode) => {
            const { index, count, shouldDisplay } = vnode.attrs
            const displayStyle = shouldDisplay ? {} : {
                display: 'none'
            }
            return (
                <ol className="scroll-dots" style={displayStyle}>
                    {Array.apply(null, Array(count)).map((_: any, i: number) => {
                        const className = i === index ? "selected scroll-dot" : "scroll-dot"
                        return <li className={className} />
                    })}
                </ol>
            )
        }
    }

}