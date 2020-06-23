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


## LICENSE: MIT