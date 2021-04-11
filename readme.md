# D365 PCF - Process Sessions

Custom Control to show the Process Sessions related to the current record on the unified interface

Double clicking on a record in the grid will open the details of that process session

![Banner image](images/banner.png)


## Downloads

Download a managed solution from the [releases page](https://github.com/cathalnoonan/d365-pcf-processsessions/releases)


## Configuration

When adding the control to a field, drag an unused field onto the form in it's own section

The control behaves as an unbound control in that it does not use the value field it is bound to in any way, so it doesn't matter what field is used for the control

Un-check the `"Display label on the form"` field on the first tab

The control can be bound to any of the following field types, these are the types supported by the framework
- Currency
- DateAndTime.DateAndTime
- DateAndTime.DateOnly
- Decimal
- Enum
- FP
- Multiple
- OptionSet
- SingleLine.Email
- SingleLine.Phone
- SingleLine.Text
- SingleLine.TextArea
- SingleLine.Ticker
- SingleLine.URL
- TwoOptions
- Whole.None

The following configuration values are required to render the control

| Name         | Description                                        |
|:---          |:---                                                |
| Field        | Field that the control will be bound to            |
| Process Type | Type of process sessions to include in the control |


--

## Building

An important note about building the control is that is uses yarn

Yarn can be installed by running the command
> npm install -g yarn

The solution can be built by double clicking the `build.bat` file at the root of the repository
- This will install the npm dependencies using `yarn`
- Then it will build the solution (which will in turn build the control)
- The resulting solution(s) will be built to `solution\dist\` as zip file(s)

---

## LICENSE: MIT