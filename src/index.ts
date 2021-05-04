import { useMemo, useRef, useEffect, useState, useCallback } from 'react'
import { createComlink } from 'react-use-comlink'
import { parsePDFcode } from './pdf.worker'
import { useUserMedia } from '@vardius/react-user-media'
import { BrowserMultiFormatReader} from '@zxing/library/esm/browser/BrowserMultiFormatReader';
import { NotFoundException } from '@zxing/library'




function usePDFCode(options: MediaTrackConstraints) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ result, setResult ] = useState<string | null>(null)
  const [ did,setDid] = useState<string>("")
  const { stream, error } = useUserMedia({ audio: false, video: {
    height:768,
    width: 1366,
    facingMode: 'environment',
    aspectRatio: 9/16,
    ...options,
  
  }})
 
 

  const codeReader = new BrowserMultiFormatReader();
  codeReader.listVideoInputDevices().then((a) => setDid(a[1].deviceId))

 

  

  const stop = useCallback(() => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => track.stop())
    }
  }, [stream])

  const reset = useCallback(() => {
    codeReader.reset()
    setResult(null)
  },  [setResult])

  useEffect(() => {
    const captureStream = stream
    const video = ref.current
    let objectUrl: any= null
    

    if (video && captureStream) {
      
      codeReader.decodeFromStream(captureStream,"video",(result,err) => {
        if (result) {
          setResult(result.getText())
          console.log(result)
        }
        
       
      })
        
      
     
    }

    return () => {
      if (captureStream) {
        captureStream.getVideoTracks().forEach((s) => s.stop())
      }

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [ref, stream])

  

  return useMemo(() => {
    return {
      ref,
      result,
      error,
      reset,
      stop,
   
    }
  }, [
    ref,
    result,
    error,
    reset,
    stop,
    
  ])
}

export default usePDFCode