# Working Prototype Known Problems Report
|                   |           |
|-------------------|-----------|
| **Product Name:** | BAM!      |
| **Team Name:**    | Team BAM! |
| **Date:**         | 5/31/2022 |

## List of functions not working correctly:
- User clients will have magnet links for user files download, but files will occasionally take a long time/hang.
  - Users need to cancel and retry the process.
  - Especially likely around 8 pm PST.
- Depending on the Internet connection or user device, the geolocation may be inaccurate.
  - Most commonly affects desktops/laptops.
  - On eduroam, there is inconsistent geolocation data.
- ‘Download All Files’ Button Bugs
  - For larger sized downloads, button will appear delayed from the individual files since it’s still zipping the file.
  - Occasionally has a ‘Network Error’ when attempting to Download All.
  - Button is not always centered.
- ‘Choose Files’ button’s ‘no file selected/filename’ is cut off on narrow screens.
- Certain UI styling elements are incompatible/inconsistent on:
  - Safari iOS, Chrome for iOS, Firefox, Opera
  - Button text font, text colors vary
  - Occasional font changes on render
- The text font takes a split-second to download when loading the page for the first time.
  A placeholder font may be visible for a split-second while the font downloads.
- When multiple BAM!s happen in the same spot in quick succession, the receiver of the second BAM! (chronologically) will receive the files of the Sender in the first BAM!. This is because the database returns the oldest Sender entry within the given thresholds.
  - The fix for this is to have the database return the Sender data that has the closest time value.
