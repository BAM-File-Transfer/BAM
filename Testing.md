# System and Unit Test Report
|                   |           |
|-------------------|-----------|
| **Product Name:** | BAM!      |
| **Team Name:**    | Team BAM! |
| **Date:**         | 5/31/2022 |

# System Test Scenarios

## User Story 1 from Sprint 2:
> As a person with multiple devices, I want to share files between devices easily so that I can continue my work on that other device.

1. Go to https://bambam.app on both devices.
2. Press "Choose Files" and select the file you want to send to your other device.
	1. Accept any device permission requests.
	2. Wait for the screen to finish loading your files. It should show an image of a fist-bump when it's ready.
3. Press "Receive Files" on the other device.
	1. Accept any device permission requests.
4. Initiate a BAM! on both devices by either:
	- Bumping the device against the other.
	- Pressing/clicking the image of the fist-bump.
	- Pressing the spacebar.
5. Wait for the Receiver to download the files.
6. Click on the download link for your file(s).


#  Unit Tests

## Christopher Cruz

### FileTransfer Component
#### Receiving One File Download
#### Valid Case
- Input(s): any file type 

- Test Steps: Open two instances of the web app. On the first instance, pick test file on the first instance, then 'Send Files'. On the second instance, click ‘Receive Files’ button. Simulate the BAM! action to initiate file transfer. Download the file and open the file.

- Expected Output: File should transfer and download correctly. Receiver should receive the original file. 
  - The method through which the web application is transferring files is through a torrent. This is a peer-to-peer established connection where a 'sender' will break down a file into bits and send them to the 'receiver'. This is done through the WebTorrent API. This method should handle any file type.

#### Invalid Case
- Input(s): any file type(s)

- Test Steps: Open two instances of the web app. On the first instance, pick test file on the first instance, then 'Send Files'. On the second instance, click ‘Receive Files’ button. Simulate the BAM! action to initiate file transfer. Download the file and open the file.

- Expected Output: File should still transfer. After downloading the file, the file will appear as ‘Network Error’ when downloading individually or as a zip.
  - Data may corrupt during transfer.


#### Receiving Multiple File Download
#### Valid Case:
- Input(s): any file type(s)

- Test Steps: Open two instances of the web app. On the first instance, pick multiple test files (vary the number of files on each test), then 'Send Files'. On the second instance, click ‘Receive Files’ button. Simulate the BAM! action to initiate file transfer. Download the files and open the files individually and as a zip.

- Expected Output: Files should transfer and download correctly. Receiver should receive the original files.
  - Just like WebTorrent handles all file types, WebTorrent should also handle any number of files; more files will just make the transfer/download process longer.

#### Invalid Case:
- Input(s): any file type(s)

- Test Steps: Open two instances of the web app. On the first instance, pick multiple test files (vary the number of files on each test), then 'Send Files'. On the second instance, click ‘Receive Files’ button. Simulate the BAM! action to initiate file transfer. Download the files and open the files individually and as a zip.

- Expected Output: Files should still transfer. After downloading the files, the files will appear as ‘Network Error’ when downloading individually or as a zip.
  - Files may still corrupt during transfer or during the download/zipping process.


#### Transferring Large File(s) Download
#### Valid Case:
- Input(s): file(s) with increasing size (1GB, 10 GB, 50 GB, 100 GB, …)

- Test Steps: Open two instances of the web app. On the first instance, pick large test file(s) (>1 GB), then 'Send Files'. On the second instance, click ‘Receive Files’ button. Simulate the BAM! action to initiate file transfer. Download the files and open the files individually and as a zip.

- Expected Output: Files should transfer and download correctly. Receiver should receive the original files.


#### Invalid Case:
- Input(s): any file type(s)

- Test Steps: Open two instances of the web app. On the first instance, pick large test file(s) (>1 GB), then 'Send Files'. On the second instance, click ‘Receive Files’ button. Simulate the BAM! action to initiate file transfer. Download the files and open the files individually and as a zip.

- Expected Output: File transfer may hang during transfer or get corrupted.
  - Larger files have a more likely chance of corrupting on file transfer. Larger files will also take a longer time to seed, maybe even getting to a state where it never seeds at all. One reason is a bug where WebTorrent fails to find a tracker it needs in order to start seeding for the client. 


## Abdullah Kose

### Acceleration Event Detecting Bump
#### Valid case
- Input(s): Acceleration in the x-axis greater than 9 m/s^2 on a mobile device
 
- Test Steps: After clicking Send button or Receive button and accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. If the acceleration in the x-axis is greater than 9, the app will initiate the transfer.

- Expected Output: After the acceleration, the app shows a loading spinner and starts the file transfer.

#### Valid case
- Input(s): Acceleration in the y-axis greater than 8 m/s^2 on a mobile device

- Test Steps: After clicking Send button or Receive button and accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. If the acceleration in the y-axis is greater than 8, the app will initiate the transfer.

- Expected Output: After the acceleration, the app shows a loading spinner and starts the file transfer.

#### Valid case
- Input(s): Acceleration in the x-axis less than 9 m/s^2 on a mobile device

- Test Steps: After clicking Send button or Receive button and accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. If the acceleration in the x-axis is less than 9, the app will not do anything.

- Expected Output: After the acceleration that is less than 9 m/s^2 in the x-axis, the app will stay in the same state waiting for a bigger acceleration.

#### Valid case
- Input(s): Acceleration in the y-axis less than 8 m/s^2 on a mobile device

- Test Steps: After clicking Send button or Receive button and accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. If the acceleration in the y-axis is less than 8, the app will not do anything.

- Expected Output: After the acceleration that is less than 8 m/s^2 in the y-axis, the app will stay in the same state waiting for a bigger acceleration.

#### Invalid case
- Input(s): Acceleration in the x-axis greater than 9 m/s^2 on a mobile device 

- Test Steps: After clicking Send button or Receive button but not accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend cannot listen for an acceleration of the client’s device. The app will not respond to a change in acceleration.

- Expected Output: After the acceleration, nothing happens.

#### Invalid case
- Input(s): Acceleration in the y-axis greater than 8 m/s^2 on a mobile device 

- Test Steps: After clicking Send button or Receive button but not accepting the permission requests, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend cannot listen for an acceleration of the client’s device. The app will not respond to a change in acceleration.

- Expected Output: After the acceleration, nothing happens.

#### Invalid case
- Input(s): Acceleration in the y-axis greater than 8 m/s^2 on a desktop device

- Test Steps: After clicking Send button or Receive button, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend cannot listen for an acceleration of the client’s device because it’s desktop. The app will not respond to a change in acceleration.

- Expected Output: After the acceleration, nothing happens.

#### Invalid case
- Input(s): Acceleration in the x-axis greater than 9 m/s^2 on a desktop device

- Test Steps: After clicking Send button or Receive button, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend cannot listen for an acceleration of the client’s device because it’s desktop. The app will not respond to a change in acceleration.

- Expected Output: After the acceleration, nothing happens.

#### Invalid case
- Input(s): Acceleration in the z-axis greater than 9 m/s^2 on a mobile device

- Test Steps: After clicking Send button or Receive button, the client will be on either WaitForBumpReceiver or WaitForBumpSender pages where the frontend listens for an acceleration of the client’s device. However, the app will not respond to a change in acceleration because the event listener only checks for accelerations in the x-axis and y-axis.

- Expected Output: After the acceleration, nothing happens.


## James Miller

## Brandon Minjares
Post request to "send" -- Magnet link and coordinates are taken from user. Testing can be done by selecting files to send, allowing location permission, bumping phone, and then checking MongoDB collection for that document that was uploaded.
Secondary test is ensuring other user received file after bumping which would confirm Post request to "send" worked.

POST request to "recv" --

Delete request of files -- Change GARBAGE_COLLECTION_PERIOD to 60000 so that files delete after 1 minute. Choose file, click send, bump phones. You can check database that file was sent. Wait 1 minute. Check database again to see if file is still in collection

MongoDB connection -- 

## Eric Truong
### File Transfer interruptions
#### Valid Case
- Input(s): A torrent is created from the Sender's chosen files and is added to the WebTorrent client instance.

- Test Steps: As the Sender is transferring the files to the Receiver(s), refresh the Sender's page mid-transfer. Then try sending the same files again.

- Expected Output: When the exact same files are chosen to be sent again, the magnet link that is generated is identical to the first time (due to the hashing function being deterministic). This means that the Receiver can just resume where it left off without needing to BAM! a second time.

#### Invalid Case
- Input(s): A torrent is created from the Sender's chosen files and is added to the WebTorrent client instance.

- Test Steps: As the Sender is transferring the files to the Receiver(s), refresh the Sender's page mid-transfer. Then try sending a different set of files.

- Expected Output: Since the set of files chosen are different (even if it's a superset or subset), the magnet link generated will be different. Since this is a distinct magnet link, the Receiver will not be able to resume downloading and will need to BAM! once again to get the new magnet link.


### Order of Operations:
#### Valid Case:
- Input(s): Sender senses an API request slightly before the Receiver does.

- Test Steps: Purposefully initiate a BAM! on the Sender slightly before the Receiver. =

- Expected Output: The Receiver should instatntly match with the Sender and should start downloading.

#### Valid Case:
- Input(s): Receiver sends an API request slightly before the Sender does.

- Test Steps: Purposefully initiate a BAM! on the Receiver slightly before the Sender.

- Expected Output: The Receiver should show a loading spinner for a bit before finding a match and initating the download.

