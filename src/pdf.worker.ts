import * as Comlink from 'comlink'
import PDF417Reader from '@zxing/library/esm/core/pdf417/PDF417Reader'
import BinaryBitmap from '@zxing/library/esm/core/BinaryBitmap'
import HybridBinarizer from '@zxing/library/esm/core/common/HybridBinarizer'
import { ImageDataLuminanceSource } from './ImageDataLuminanceSource'
import { BrowserMultiFormatReader, MultiFormatReader } from '@zxing/library'

export const parsePDFcode = (data: ImageData) => {
  //console.log(data)
  try {
    
    return new PDF417Reader()
      .decode(
        new BinaryBitmap(
          new HybridBinarizer(
            new ImageDataLuminanceSource(data)
          )
        )
      )
      .getText()
  } catch (e) {
    
    return null
  }

  return null
}

Comlink.expose(parsePDFcode)