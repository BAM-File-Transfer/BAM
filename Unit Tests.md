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
