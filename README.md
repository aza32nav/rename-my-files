# Rename files

Rename my files with the format 1234_1.mp4 in a folder with a new name.
### Example:
```
$ rename-my-files -n filename -d 2 -c true
```

Rename 1122_1.mp4, 1122_5.mp4 and 1122_12.mp4 to filename_01.mp4, filename_05.mp4 and filename_12.mp4.

### Note:
Without the [-c] or with the [-c false] option only show the possible changes, but not change the filenames. 

# Improvements
+ Apply an Async-Await approach.
+ Make more generic to cover more file name formats and extensions(with more options or with custom regex).
+ Add more cli options like man page and documentation.
