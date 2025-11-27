import type { ComponentProps } from "@/types/index.ts"
import { mapValues, isNil } from "lodash-es"

export const commonDefaultProps:ComponentProps = {
    // size
   height: 'auto',
   width: 'auto',
   maxHeight: 'auto',
   maxWidth: 'auto',
   minHeight: 'auto',
   minWidth: 'auto',
   // position
   position: 'static',
   top: '0px',
   right: '0px',
   bottom: '0px',
   left: '0px',
   // border
   border: '0',
   borderRadius: '0',
   borderTop: 'initial',
   borderRight: 'initial',
   borderBottom: 'initial',
   borderLeft: 'initial',
   borderColor: 'initial',
   borderWidth: 'initial',
   // shadow and opacity
   boxShadow: 'initial',
   opacity: 'initial',
   // geometric
   backgroundColor: 'initial',
}

// 将默认值props 转换成组件的 props
export const textDefaultProps:ComponentProps = {
    ...commonDefaultProps,
    // text
    text: '',
    textAlign: 'left',
    color: '#000',
    textDecoration: 'none',
    fontFamily: 'initial',
    fontSize: 'initial',
    fontWeight: 'initial',
    lineHeight: 'initial',
    letterSpacing: 'initial',
    textIndent: 'initial',
    textOverflow: 'initial',
}

// 将默认值props 转换成组件的 props
export const transformToComponentProps = (props:ComponentProps) => {
    return mapValues(props, (item)=>{
        if(!isNil(item)){
            return {
                type: item?.constructor,
                default: item
            }
        } else{
            return null
        }
    })
}
