import type { ComponentProps } from "@/types/index.ts"
import { mapValues, isNil } from "lodash-es"

export const commonDefaultProps:ComponentProps = {
    // size
    height: '',
    width: '',
   maxHeight: '',
   maxWidth: '',
   minHeight: '',
   minWidth: '',
   // position
   position: '',
   top: '0px',
   right: '0px',
   bottom: '0px',
   left: '0px',
   // border
   border: '',
   borderRadius: '',
   borderTop: '',
   borderRight: '',
   borderBottom: '',
   borderLeft: '',
    borderColor: '',
    borderWidth: '',
    // shadow and opacity
    boxShadow: '',
    opacity: '',
    // geometric
    backgroundColor: '',

}

// 将默认值props 转换成组件的 props
export const textDefaultProps:ComponentProps = {
    ...commonDefaultProps,
    // text
    text: '',
    textAlign: 'left',
    color: '#000',
    textDecoration: 'none',
    fontFamily: '',
    fontSize: '',
    fontWeight: '',
    lineHeight: '',
    letterSpacing: '',
    textIndent: '',
    textOverflow: '',
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