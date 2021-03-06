<a name="unreleased"></a>
## [Unreleased]


<a name="1.0.0-rc.0"></a>
## [1.0.0-rc.0] - 2018-11-07
### 1) Features
- The update will update when 1. chapter reopen or not sold 2. has changes
- novel is updatable
- Add fetching from location and server
- Add date to the chapter too
- Add date in old novel (version 1)
- Able to load information from resource file

### 2) Improving User Experience
- Add RC release to deployment
- Add improvement of version in token
- Improve new security of nd command
- Add log error without exit
- Now you can fetch multiple id/location
- Update chapter output
- Avoid too many create object for printer
- Change the way to save chapter in novel
- Update the way to save chapter date
- Update error result in production
- History should sort by date (present => past)

### 3) Fixes Bug
- Fix fetching location error
- Fix wrong param to display Date

### 4) Documentation
- Add new help command


<a name="1.0.0-beta.3"></a>
## [1.0.0-beta.3] - 2018-11-04
### 1) Features
- Add resource file to the novel folder
- Add history of novel and chapter
- Add no internet connection error [fix] Fix error of private staff in novel

### 2) Improving User Experience
- Add history and resource object (WIP)
- Update help command color
- Move printer out of model
- Improve test in CI
- Implement more about History (WIP)

### 3) Fixes Bug
- Fix lib version
- Fix CI error
- Fix forgot to update path in resource type

### 4) Documentation
- Update document to most of Model

### Pull Requests
- Merge pull request [#18](https://github.com/kamontat/nd-js/issues/18) from kamontat/improve/novel/history


<a name="1.0.0-beta.2"></a>
## [1.0.0-beta.2] - 2018-10-23
### 1) Features
- Add validator command and more
- Add new output to download and fix report error
- New output now support in raw download
- Add --raw and --file to init, to setting token and username
- Add token generator and security update
- Add Token verify code
- Implement JWT in app token
- Add --raw to config path
- Add warning and error on the end of script too
- Add resource file JSON format
- Add resource model

### 2) Improving User Experience
- Remove verbose log, because it log in file
- Change default level to verbose
- Change output color
- Update logger, no debug + verbose in console
- Update UI color and add --with-chapter to fetch
- Add clickable link instead of long link
- Add log for sold, closed and unknown chapter
- Add --with-chapter to log result the chapter
- Add exception summary to raw-download
- Add short story in novel v1
- Add OG to html file
- Change title if chapter name not exist

### 3) Fixes Bug
- Fix deployment script
- Fix duplicate version in LOC
- Fix changelog to next tag
- Fix error when deploy new version
- Fix the way to release new version
- username has space in CI
- Fix all error test
- Fix checking type error
- Fix typo of username output
- Fix verify error, not jwt id
- Fix args not found
- Typo
- Fix chapter list only completed chapter
- Fix the way how to check the exception
- Fix novel not normalize as expected
- novel name should be back
- Fix config not found

### 4) Documentation
- Add LOC for each version


<a name="v1.0.0-beta.1"></a>
## [v1.0.0-beta.1] - 2018-10-04
### 1) Features
- Add download novel command ([#13](https://github.com/kamontat/nd-js/issues/13))


<a name="v1.0.0-beta.0"></a>
## [v1.0.0-beta.0] - 2018-10-04
### 1) Features
- Completed fetching novel

### 2) Improving User Experience
- Add fetch command with verbose output
- Complete build novel method
- Improve novel builder usage
- Not analytic test code

### 3) Fixes Bug
- Fix circle typo
- Remove fixme, create chapters support v1

### 4) Documentation
- Change codeclimate to codecov
- Add fixme

### Pull Requests
- Merge pull request [#10](https://github.com/kamontat/nd-js/issues/10) from kamontat/enhance/fetch


<a name="v1.0.0-alpha.1"></a>
## [v1.0.0-alpha.1] - 2018-09-28
### 1) Features
- Download now support multiple chapter
- Fully customize novel content
- Able to get content from html file
- Working on Decode and reformat the novel content

### 2) Improving User Experience
- Update meta in html file
- Add download improvement
- Add warning message

### 3) Fixes Bug
- Fix ci error
- Fix error if config folder not found
- Fix config not found

### 4) Documentation
- Update title
- Add readme badge

### Pull Requests
- Merge pull request [#1](https://github.com/kamontat/nd-js/issues/1) from kamontat/renovate/configure


<a name="1.0.0-alpha.0"></a>
## 1.0.0-alpha.0 - 2018-09-23
### 1) Features
- Add deploy script
- Add config, initial, setup logger (WIP)
- Update new code design
- Update 2nd time
- Setup project and change name

### 2) Improving User Experience
- ignore docs file in master branch
- Add jsdoc configuration
- Remove minify script since we use webpack
- Add a lot of improvement
- Add logger improvement

### 3) Fixes Bug
- Fix libraires missing
- make clean before deploy

### 4) Documentation
- Add TODO document


[Unreleased]: https://github.com/kamontat/nd-js/compare/1.0.0-rc.0...HEAD
[1.0.0-rc.0]: https://github.com/kamontat/nd-js/compare/1.0.0-beta.3...1.0.0-rc.0
[1.0.0-beta.3]: https://github.com/kamontat/nd-js/compare/1.0.0-beta.2...1.0.0-beta.3
[1.0.0-beta.2]: https://github.com/kamontat/nd-js/compare/v1.0.0-beta.1...1.0.0-beta.2
[v1.0.0-beta.1]: https://github.com/kamontat/nd-js/compare/v1.0.0-beta.0...v1.0.0-beta.1
[v1.0.0-beta.0]: https://github.com/kamontat/nd-js/compare/v1.0.0-alpha.1...v1.0.0-beta.0
[v1.0.0-alpha.1]: https://github.com/kamontat/nd-js/compare/1.0.0-alpha.0...v1.0.0-alpha.1
