# Migration from V1 to V2

After importing the V2 (or higher) solution to the environment, the control 
configuration needs to be updated to add the new properties.

The new properties added in this version are:
- Entity ID
- Entity Logical Name

To add the new properties, find the forms where the control is used, and double 
click on the control.

Set the `Entity ID` property to the primary ID field of the entity:
- i.e. for "Account", this will be "accountid"
- i.e. for "Contact", this will be "contactid"

Set the `Entity Logical Name` property to the logical name of the entity:
- i.e. for "Account", this will be "account"
- i.e. for "Contact", this will be "contact"

Save and publish the form, and make sure the changes are deployed to your other 
environments after the control is imported.