# System and Unit Test Report
|                   |           |
|-------------------|-----------|
| **Product Name:** | BAM!      |
| **Team Name:**    | Team BAM! |
| **Date:**         | 5/31/2022 |

# System Test Scenarios

#  Unit Tests

## Christopher Cruz

### FileTransfer Component
---
#### Receiving One File

| | |
| ------ | ----------- |
| Input(s) | any file type |
| Tested | .jpg, .png, .gif, .zip, .pdf, .mp3, .mp4, .exe, .iso |

##### **Test Steps:**
1. Open two instances of the web app
2. On the first instance, click ‘Choose Files’ button
3. Pick test file
4. Click ‘Send Files’ button
5. On the second instance, click ‘Receive Files’ button
6. Both instances should be on the waiting page
7. For phone-to-phone test:
    * Bump the two phones together
8. For computer-to-phone test:
    * Bump the phone on the spacebar
9. Check the second instance for the file download
10. Download the file using the:
    * Individual File button
    * ‘Download All Files’ button
11. After the file has been downloaded, open the file

| Valid Input | Expected Outcome |
| ------ | ----------- |
| Any file type | File should transfer and download correctly. Receiver should receive the original file. |

| Invalid Input | Expected Outcome |
| ------ | ----------- |
| N/A | File should still transfer. when downloading individually or as a zip, the file will appear as ‘Network Error’ or as a corrupted file. |

> #### The method through which the web application is transferring files is through a torrent. This is a peer-to-peer established connection where a 'sender' will break down a file into bits and send them to the 'receiver'. This is done through the WebTorrent API. This method should handle any file type, but errors may occur during the file transfer process.
---
#### Receiving Multiple File Download
| | |
| ------ | ----------- |
| Inputs | any file types |
| Tested | .jpg, .png, .gif, .zip, .pdf, .mp3, .mp4, .exe, .iso |

##### **Test Steps:**
1. Open two instances of the web app
2. On the first instance, click ‘Choose Files’ button
3. Pick multiple test files (vary the number of files on each test)
4. Click ‘Send Files’ button
5. On the second instance, click ‘Receive Files’ button
6. Both instances should be on the waiting page
7. For phone-to-phone test:
    * Bump the two phones together
8. For computer-to-phone test:
    * Bump the phone on the spacebar
9. Check the second instance for the file download
10. Download the file using the:
    * Individual File buttons
    * ‘Download All Files’ buttons
11. After the files has been downloaded, open the individually downloaded files
12. Open the zip file and check the files.

| Valid Input | Expected Outcome |
| ------ | ----------- |
| Any file type | Files should transfer and download correctly. Receiver should receive the original files. |

| Invalid Input | Expected Outcome |
| ------ | ----------- |
| N/A | Files should still transfer. After downloading the files, the files will appear as ‘Network Error’ when downloading individually or as a zip.  |

> #### Just like WebTorrent handles all file types, WebTorrent should also handle any number of files; more files will just make the transfer/download process longer. However, files may still corrupt during transfer or during the download/zipping process.
---
#### Transferring Large File(s) Download
| | |
| ------ | ----------- |
| Inputs | file(s) with increasing size (1GB, 10 GB, 50 GB, 100 GB, …) |
| Tested | varying sizes <= 120 GB |

##### **Test Steps:**
1. Open two instances of the web app
2. On the first instance, click ‘Choose Files’ button
3. Pick large test file(s) (>1 GB)
4. Click ‘Send Files’ button
5. On the second instance, click ‘Receive Files’ button
6. Both instances should be on the waiting page
7. For phone-to-phone test:
    * Bump the two phones together
8. For computer-to-phone test:
    * Bump the phone on the spacebar
9. Check the second instance for the file download
10. Download the file using the:
    * Individual File buttons
    * ‘Download All Files’ buttons
11. After the file(s) has been downloaded, open the file(s)

| Valid Input | Expected Outcome |
| ------ | ----------- |
| Any file type | Files should transfer and download correctly. Receiver should receive the original files. |

| Invalid Input | Expected Outcome |
| ------ | ----------- |
| N/A | File transfer may hang during transfer or get corrupted.  |

> #### Larger files have a more likely chance of corrupting on file transfer. Larger files will also take a longer time to seed, maybe even getting to a state where it never seeds at all. One reason is a bug where WebTorrent fails to find a tracker it needs in order to start seeding for the client. 


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
### File Transfer interruptions
#### Valid Case
Input(s): A torrent is created from the Sender's chosen files and is added to the WebTorrent client instance.

Test Steps: As the Sender is transferring the files to the Receiver(s), refresh the Sender's page mid-transfer. Then try sending the same files again.

Expected Output: When the exact same files are chosen to be sent again, the magnet link that is generated is identical to the first time (due to the hashing function being deterministic). This means that the Receiver can just resume where it left off without needing to BAM! a second time.

#### Invalid Case
Input(s): A torrent is created from the Sender's chosen files and is added to the WebTorrent client instance.

Test Steps: As the Sender is transferring the files to the Receiver(s), refresh the Sender's page mid-transfer. Then try sending a different set of files.

Expected Output: Since the set of files chosen are different (even if it's a superset or subset), the magnet link generated will be different. Since this is a distinct magnet link, the Receiver will not be able to resume downloading and will need to BAM! once again to get the new magnet link.


### Order of Operations:
#### Valid Case:
Input(s): Sender senses an API request slightly before the Receiver does.

Test Steps: Purposefully initiate a BAM! on the Sender slightly before the Receiver. =

Expected Output: The Receiver should instatntly match with the Sender and should start downloading.

#### Valid Case:
Input(s): Receiver sends an API request slightly before the Sender does.

Test Steps: Purposefully initiate a BAM! on the Receiver slightly before the Sender.

Expected Output: The Receiver should show a loading spinner for a bit before finding a match and initating the download.

