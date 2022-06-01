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

### Acceleration Event Detecting Bump
#### Valid case
Input(s): Acceleration in the x-axis greater than 9 m/s^2 on a mobile device
 
Test Steps: After clicking Send button or Receive button and accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. If the acceleration in the x-axis is greater than 9, the app will initiate the transfer.

Expected Output: After the acceleration, the app shows a loading spinner and starts the file transfer.

#### Valid case
Input(s): Acceleration in the y-axis greater than 8 m/s^2 on a mobile device

Test Steps: After clicking Send button or Receive button and accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. If the acceleration in the y-axis is greater than 8, the app will initiate the transfer.

Expected Output: After the acceleration, the app shows a loading spinner and starts the file transfer.

#### Valid case
Input(s): Acceleration in the x-axis less than 9 m/s^2 on a mobile device

Test Steps: After clicking Send button or Receive button and accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. If the acceleration in the x-axis is less than 9, the app will not do anything.

Expected Output: After the acceleration that is less than 9 m/s^2 in the x-axis, the app will stay in the same state waiting for a bigger acceleration.

#### Valid case
Input(s): Acceleration in the y-axis less than 8 m/s^2 on a mobile device

Test Steps: After clicking Send button or Receive button and accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. If the acceleration in the y-axis is less than 8, the app will not do anything.

Expected Output: After the acceleration that is less than 8 m/s^2 in the y-axis, the app will stay in the same state waiting for a bigger acceleration.

#### Invalid case
Input(s): Acceleration in the x-axis greater than 9 m/s^2 on a mobile device 

Test Steps: After clicking Send button or Receive button but not accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend cannot listen for an acceleration of the client’s device. The app will not respond to a change in acceleration.

Expected Output: After the acceleration, nothing happens.

#### Invalid case
Input(s): Acceleration in the y-axis greater than 8 m/s^2 on a mobile device 

Test Steps: After clicking Send button or Receive button but not accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend cannot listen for an acceleration of the client’s device. The app will not respond to a change in acceleration.

Expected Output: After the acceleration, nothing happens.

#### Invalid case
Input(s): Acceleration in the y-axis greater than 8 m/s^2 on a desktop device

Test Steps: After clicking Send button or Receive button, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend cannot listen for an acceleration of the client’s device because it’s desktop. The app will not respond to a change in acceleration.

Expected Output: After the acceleration, nothing happens.

#### Invalid case
Input(s): Acceleration in the x-axis greater than 9 m/s^2 on a desktop device

Test Steps: After clicking Send button or Receive button, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend cannot listen for an acceleration of the client’s device because it’s desktop. The app will not respond to a change in acceleration.

Expected Output: After the acceleration, nothing happens.

#### Invalid case
Input(s): Acceleration in the z-axis greater than 9 m/s^2 on a mobile device

Test Steps: After clicking Send button or Receive button, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. However, the app will not respond to a change in acceleration because the event listener only checks for accelerations in the x-axis and y-axis.

Expected Output: After the acceleration, nothing happens.


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
- Purposefully initiate a BAM! on the Sender slightly before the Receiver. The Receiver should instatntly match with the Sender and should start downloading.
- Purposefully initiate a BAM! on the Receiver slightly before the Sender. The Receiver should show a loading spinner for a bit before finding a match and initating the download.

