// Writes a grayscale person mask (white = person) for a photo, using Apple Vision on-device.
// Usage: swift design/tools/person-mask.swift <photo> <mask.png>
import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count == 3 else { print("usage: person-mask <photo> <mask.png>"); exit(1) }
let url = URL(fileURLWithPath: args[1])
guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
      let cg = CGImageSourceCreateImageAtIndex(src, 0, nil) else { print("cannot read image"); exit(1) }
let props = CGImageSourceCopyPropertiesAtIndex(src, 0, nil) as? [CFString: Any]
let orientRaw = (props?[kCGImagePropertyOrientation] as? UInt32) ?? 1
let orientation = CGImagePropertyOrientation(rawValue: orientRaw) ?? .up

let req = VNGeneratePersonSegmentationRequest()
req.qualityLevel = .accurate
req.outputPixelFormat = kCVPixelFormatType_OneComponent8
let handler = VNImageRequestHandler(cgImage: cg, orientation: orientation, options: [:])
try handler.perform([req])
guard let mask = req.results?.first?.pixelBuffer else { print("no person found"); exit(2) }

let ci = CIImage(cvPixelBuffer: mask)
let ctx = CIContext()
guard let out = ctx.createCGImage(ci, from: ci.extent) else { exit(3) }
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: args[2]) as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, out, nil)
CGImageDestinationFinalize(dest)
print("mask \(out.width)x\(out.height) orientation \(orientRaw)")
