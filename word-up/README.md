# Word Up

This application is a simple page with a textarea where all of the text should
be visible on whatever screen you're viewing the page without ever having to
scroll.

On top of that, the font size in the text area should be as large as possible,
but such that it still matches the above condition.

The use case for this application is kind of like a "billboard" for a speaker -
where you can use this web application to show them a little message from an
overhead monitor that they can read. The text needs to be as large as it can be,
without having to scroll.

## To Run

This executable will just spin up a simple server on port 8000:

```
./bin/server
```

If that doesn't work (which would mean you either don't have python, or don't
have python's SimpleHTTPServer module enabled), you can use anything that can serve
up the `index.html` file.

## Tech

This application just uses HTML, CSS, JavaScript & jQuery. If you'd like to
remove jQuery and the application still works - be my guest!

It currently is not working as expected. - but it's close! Please, make it work!

## Issue Fixed

I went ahead and redesigned the outlook and fixed the responsive text issue. However, the design may not be something you were looking for, so let me know if you want something different.

Just press the navigation bar icon, enter in the message you want to display on the main screen, then press enter and the navigation overlay will collapse and the message will be displayed to the main screen!
