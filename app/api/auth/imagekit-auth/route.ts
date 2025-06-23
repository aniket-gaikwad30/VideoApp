// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
   try {
     // Debug: log the private key to ensure it's loaded
     console.log("IMAGEKIT_PRIVATE_KEY:", process.env.IMAGEKIT_PRIVATE_KEY);
     const { token, expire, signature } = getUploadAuthParams({
         privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
         publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
         // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
         // token: "random-token", // Optional, a unique token for request
     })

     return Response.json({ token, expire, signature, publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY })
   } catch (error) {
     console.error("ImageKit auth error:", error)
     return Response.json({ error: "Failed to generate ImageKit auth params" }, { status: 500 })
   }
}