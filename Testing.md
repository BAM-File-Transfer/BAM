# System and Unit Test Report
|                   |           |
|-------------------|-----------|
| **Product Name:** | BAM!      |
| **Team Name:**    | Team BAM! |
| **Date:**         | 5/31/2022 |

# System Test Scenarios

#  Unit Tests

## Christopher Cruz

## Abdullah Kose

## James Miller

## Brandon Minjares
Post request to "send" -- Magnet link and coordinates are taken from user. Testing can be done by selecting files to send, allowing location permission, bumping phone, and then checking MongoDB collection for that document that was uploaded.
Secondary test is ensuring other user received file after bumping which would confirm Post request to "send" worked.

POST request to "recv" --

Delete request of files -- Change GARBAGE_COLLECTION_PERIOD to 60000 so that files delete after 1 minute. Choose file, click send, bump phones. You can check database that file was sent. Wait 1 minute. Check database again to see if file is still in collection

MongoDB connection -- 

## Eric Truong
File Transfer interruptions:
- As the Sender is transferring the files to the Receiver(s), refresh the Sender's page (the equivalance class contains anything that can interrupt the Sender's connection to the internet, including turning on Airplane mode, turning off WiFi, etc). Then, reestablish the connection/try sending the files again. The Receiver should finish downloading the files.

Order of Operations:
- Purposefully intiate a BAM! on the Sender slightly before the Receiver. The Receiver should instatntly match with the Sender and should start downloading.
- Purposefully initiat a BAM! on the Receiver slightly before the Sender. The Receiver should show a loading spinner for a bit before finding a match and initating the download.

