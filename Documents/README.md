
# Domain Description Overview

## Domain : Menstrual Tracking & Menstrual Communication

## Entities :

* User : A person with interest of tracking its menstrual cycle or viewing a friend's or partner's cycle information
    * Composed of:
        * Calendar
        * Set of Shared Calendars
    * Attributes:
        * Email
        * Is Regular

* Calendar : A structure to keep track of cycles
    * Composed of:
        * Set of Menstrual Cycle
    * Attributes:
        * Owner

* Menstrual Cycle (Atomic) :
    * Attributes:
        * Bleed Start
        * Bleed End
        * End Cycle Date

* Menstrual Cycle Structure:

![image](../Documents/Diagrams/CycleStructure.png)

* Entity RelationShips:

![image](../Documents/Diagrams/FlovverERD.png)

## Functions:

### Share Calendar with other people functions

* Get People that can see your calendar 
    * Name: GET_SHARED_USERS
    * PARAMETERS: User U
    * Returns: Set of Users U

* Get People that you can see there calendar:
    * Name: GET_SHARED_WITH_ME 
    * PARAMETERS: User U
    * Returns: Set of Users U

* Approve another Person's request to show you his calendar
    * Name: APPROVE
    * PARAMETERs: User U1, User U2

* Get Unapproved message:
    * Name: GET_UNAPPROVED
    * PARAMETERS: User U1,
    * Returns : Set of Users U

* View other persons menstrual information:
    * Name: GET_CYCLE_INFO
    * PARAMETERS: User U1, User U2
    * Returns: Set of MenstrualCycles M
    
### Share 


