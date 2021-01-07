import {
    Component,
    Vnode,
    route
} from 'mithril'


export const elementAttrs = {
    tag: "",
    attrs: {},
    state: {}
}

export function Link() {
    return {
        ...elementAttrs,
        ...route.Link
    }
}

export interface BaseComponent<Attrs> extends Component<Attrs>, Vnode {}
