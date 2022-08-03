# Configuration

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
| Entity ID    | Bind to the Primary ID field of the entity         |
| Entity Logical Name | Type the logical name of the entity         |
