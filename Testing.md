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
6. Once all the files are downloaded, the Sender can safely close the tab.
7. Receiver can click on the download button(s).,


## User Story 2 from Sprint 3:
> As a social person, I would like a fun and interactive way of sharing files so that I can fist bump people.

1. Go to https://bambam.app on all *mobile* devices.
2. Press "Choose Files" and select the file you want to send to the other devices.
	1. Accept any device permission requests.
	2. Wait for the screen to finish loading your files. It should show an image of a fist-bump when it's ready.
3. Press "Receive Files" on the other device.
	1. Accept any device permission requests.
4. Initiate a BAM! on all mobile devices by fist-bumping them together.
5. We know the BAM! was detected if a loading spinner shows up on screen.
6. Wait for the Receiver to download the files.
8. Once all the files are downloaded, the Sender can safely close the tab.
7. Receivers can click on the download button(s).,


## User Story 4 from Sprint 3:
> As a leader of a team, I want to share files with other members of the team so that we can coordinate the workflow.

1. Go to https://bambam.app on 3+ devices.
2. The leader needs to press "Choose Files" and select the file(s) they want to send to the other members.
	1. Accept any device permission requests.
	2. Wait for the screen to finish loading your files. It should show an image of a fist-bump when it's ready.
3. Meanwhile, the other members should press "Receive Files" on their devices.
4. Initiate a BAM! on all devices at the same time.
	- If it's all mobile devices, just fist-bump all the phones together.
	- If there are any laptops/desktops, they will need to press Spacebar or click the fist-bump image at the same time as the fist-bump.
6. Wait for the Receivers to download the files.
8. Once all the files are downloaded, the Sender can safely close the tab.
7. Receivers can click on the download button(s).,


#  Unit Tests

## Christopher Cruz

### FileTransfer Component
---
### Receiving One File Download
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


### Receiving Multiple File Download
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


### Transferring Large File(s) Download
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
### Geolocation
### Invalid Case
- Input(s): Location is turned off in browser settings.

- Test Steps: Sender selects files to send or receiver clicks the receive button.

- Expected Output: Permissions are denied. The application can not proceed from here.

### Valid Case
- Input(s): Location is turned on in browser settings.

- Test Steps: Sender selects files to send or receiver clicks the receive button.

- Expected Output: Longitude and latitude of the user is returned.

### Time
### Invalid Case
- Input(s): A string that contains a non-whitespace character that is not a number is sent to the server for the matching algorithm.

- Test Steps: Initiate the bump phase of the file transfer. Return an invalid input for the time. Run the server code.

- Expected Output: NaN is returned and program will print "invalid".

### Valid Case
- Input(s): A string that can be parsed and turned into an integer.

- Test Steps: Initiate the bump phase of the file transfer. Bump devices and record the milliseconds elapsed since the UNIX epoch.

- Expected Output: An integer is returned with no error message.


## Brandon Minjares

### Post Request to "send"
#### Valid case
- Input(s): Location, accelerometer data, and magnet link are sent to the body of the HTTP post request "/send".
 
- Test Steps: After clicking Send button and accepting the permission requests, the client will be on the WaitForBumpSender page where the frontend listens for an acceleration of the client’s device. Once a valid bump occurs the HTTP request is made.

- Expected Output: After the bump, an object from the request body data will be created in the MongoDB collection ready to be received by the receiver. You can confirm this by viewing MongoDB collection and finding object created or my completing the post request to "recv" on another device and successfully receiving the file to be downloaded.

### Post Request to "recv"
#### Valid case
- Input(s): Location and accelerometer data are sent to the body of the HTTP post request "/recv".
 
- Test Steps: After clicking Receive button and accepting the permission requests, the client will be on the WaitForBumpReceiver page where the frontend listens for an acceleration of the client’s device. Once a valid bump occurs the HTTP request is made.

- Expected Output: After the bump an object from the request body data will be created and sent to the MongoDB collection to find the object that matches the parameters given from the receiver. If they match the file from the collection will be sent to the Receiver to be parsed into Downloadable Files.

### Delete Request -- Runs on a time interval
#### Valid case

- Input(s): Must create object in database by successfully completing the BUMP!

- Test Steps: Can change GARBAGE_COLLECTION_PERIOD to 300000 so that the deletion time interval is minimized

- Expected Output: After 5 minutes all the objects in the database that have been created more than 2 minutes ago will be deleted so you will not be able to find them.


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

