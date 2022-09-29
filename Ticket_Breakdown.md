# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Ticket breakdown

Assumptions:
* Agents can work in multiple facilities and facilities have multiple agents (n-n correlation between each other).
* We are using a relational DB for storing the data.
* We have a separate join table for Facilities and Agents with three columns: id, facility_id and agent_id.

Solution: We have to add a new column to the join table which contains a new field called masked_agent_id that is generated from the facility_id and the agent_id.

Ticket 1: Migrate agent_facility table.
* Implement (versioned) SQL migration script to add masked_agent_id field.
* Create a backup of DB.
* Migrate the database.
* Update ORM.

Ticket 2: Extend logic when assigning agents to facilities to generate masked_agent_id s.
Extend endpoint
