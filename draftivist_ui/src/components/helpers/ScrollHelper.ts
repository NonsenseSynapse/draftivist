type ScrollAttrs = {
    onscroll: (e: Event) => void 
}

type ScrollHelper = {
    attrs: ScrollAttrs
    initialize: (e: HTMLElement) => void
    shouldDisplay: () => boolean
    getIndex: () => number
}

export default function(): ScrollHelper {

    let index = 0;
    let shouldDisplay = false;

    let offsetWidth = 0;

    let childWidth = 0;
    let childMargin = 0;

    let leftOffset = 0;

    function calcOffsets(element: HTMLElement) {
        offsetWidth = element.offsetWidth
        const leftPadding = parseInt(getComputedStyle(element).paddingLeft, 10)

        const childNode = element.childNodes[0] as HTMLElement
        childWidth = childNode.offsetWidth
        childMargin = parseInt(getComputedStyle(childNode).marginRight, 10)

        // this computes the left offset
        leftOffset = Math.floor(leftPadding + 3*childWidth/2 + childMargin - offsetWidth/2)

        // don't bother if window too wide
        shouldDisplay = offsetWidth / childWidth <= 3
    }

    function initialize(e: HTMLElement) {
        calcOffsets(e)
    }

    function onScroll(e: Event) {
        const target = e.target as HTMLInputElement
        if (target.offsetWidth != offsetWidth) {
            calcOffsets(target)
        }

        const atScrollEnd = target.scrollLeft + target.offsetWidth >= target.scrollWidth
        // if we're at the very end we want to display the last index
        const roundFunc = atScrollEnd ? Math.ceil : Math.floor

        index = roundFunc((target.scrollLeft - leftOffset) / childWidth) + 1
    }


    return {
        attrs: {
            onscroll: onScroll
        },
        initialize,
        getIndex: () => index,
        shouldDisplay: () => shouldDisplay
    }
}