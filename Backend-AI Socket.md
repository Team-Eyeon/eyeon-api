# Backend Socket Communication Guide (NestJS Integration)

## Overview

The AI module exposes a **TCP socket server** for real-time communication of detection results and video frames. The backend (NestJS) will act as a **client**, connecting to this server to receive detection data, alerts, and optionally, annotated video frames.

---

## 1. Socket Server Details

- **Protocol:** TCP (not WebSocket)
- **Host:** Configurable (default: `localhost`)
- **Port:** Configurable (default: `8080`)
- **Mode:** The AI module runs in `server` mode; backend connects as a client.

---

## 2. Connection Lifecycle

1. **Connect:**  
   The backend opens a TCP socket to the AI module's host/port.
2. **Welcome Message:**  
   On connection, the server sends a JSON welcome message.
3. **Data Streaming:**  
   The server streams detection results and optionally video frames as JSON or binary blobs.
4. **Callbacks:**  
   The backend should be ready to handle different message types (see below).
5. **Disconnection:**  
   The server or client can close the connection at any time. The backend should handle reconnections.

---

## 3. Message Types & Payloads

### 3.1. Welcome Message

Upon connection, the server sends:

```json
{
  "type": "welcome",
  "message": "Connected to PreAct Crime Detection System",
  "timestamp": 1710000000.123,
  "mode": "detection_stream"
}
```

### 3.2. Detection Data

Detection results are sent as JSON objects, e.g.:

```json
{
  "type": "detection_result",
  "timestamp": 1710000001.456,
  "detection_count": 2,
  "detections": [
    {
      "bbox": [x1, y1, x2, y2],
      "confidence": 0.92,
      "class_id": 0,
      "class_name": "person",
      "is_crime_relevant": true,
      "timestamp": 1710000001.456
    }
  ],
  "frame_info": {
    "width": 1280,
    "height": 720,
    "channels": 3
  }
}
```

### 3.3. Alert Data

Alerts are sent as part of batch results or as separate messages:

```json
{
  "type": "alert",
  "alert_id": "alert_1710000002",
  "timestamp": 1710000002.789,
  "camera_id": "main",
  "threat_level": "critical",
  "confidence": 0.95,
  "threat_types": ["knife", "person"],
  "location": { "x": 640, "y": 360 },
  "detection_count": 1,
  "message": "CRITICAL threat detected: knife, person"
}
```

### 3.4. Video Frames (Optional)

If enabled, video frames are sent as binary blobs (e.g., JPEG-encoded). Each frame is typically preceded by a small JSON header indicating the frame size and metadata.

---

## 4. Data Framing & Parsing

- **JSON messages** are sent as length-prefixed or newline-delimited strings.
- **Binary frames** are sent as length-prefixed blobs, with a preceding JSON header.
- The backend must buffer and parse incoming data accordingly.

**Example (pseudocode):**

```typescript
// Pseudocode for reading a message
const length = readInt32(socket); // Read 4 bytes for length
const jsonStr = readBytes(socket, length);
const message = JSON.parse(jsonStr);
```

---

## 5. Backend Responsibilities

- **Connect** to the AI module's socket server as a TCP client.
- **Parse** incoming JSON messages and handle them by type.
- **Optionally decode** and process video frames if needed.
- **Acknowledge** or respond if protocol requires (currently, the protocol is one-way: server → client).
- **Handle reconnections** and errors gracefully.

---

## 6. Example: NestJS TCP Client

You can use Node.js's `net` module or a library like `nestjs-terminus` or `nestjs-socket` (for TCP, not WebSocket).

**Basic Node.js Example:**

```typescript
import * as net from "net";

const client = net.createConnection({ host: "localhost", port: 8080 }, () => {
  console.log("Connected to AI module");
});

client.on("data", (data) => {
  // Buffer and parse JSON messages as described above
  // Handle detection_result, alert, etc.
});

client.on("end", () => {
  console.log("Disconnected from AI module");
});
```

---

## 7. Error Handling & Reconnection

- If the connection drops, the backend should attempt to reconnect after a delay.
- Log and handle malformed messages gracefully.

---

## 8. Security & Authentication

- **Note:** The current protocol does not implement authentication or encryption. If needed, consider wrapping the socket in TLS or adding an authentication handshake.

---

## 9. Customization

- The protocol can be extended to support additional message types, bidirectional communication, or custom commands.
- If you need to send commands from backend → AI module, coordinate on message format.

---

## 10. Contact

For questions or protocol changes, contact the AI module developer.

---

**Summary:**  
The backend connects as a TCP client, receives JSON-encoded detection and alert messages, and optionally video frames. All messages are self-describing and can be handled by type. The backend should be robust to connection drops and message parsing errors.
