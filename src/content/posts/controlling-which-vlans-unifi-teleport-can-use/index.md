---
title: 'Controlling Which Vlans UniFi Teleport Can Use'
published: 2024-10-09
draft: false
description: 'A guide on how to restrict UniFi Teleport users to specific VLANs.'
tags: ['unifi', 'authentication']
---

:::important
As of August 2025, Ubiquiti has released version 9.4.19 of the UniFi Network application, which collapses the "Traffic & Firewall Rules" and other rules into a single "Policy Table" interface. You need to navigate to **Settings** >  **Policy Table** and toggle the Firewall type filter to manage your firewall rules. The process of creating rules remains similar, but the interface has been streamlined. - *September 2025*
:::

In this guide we will learn how to configure which IPs and VLANs users connected via UniFi Teleport can access.

## Step 1. Identify the IP range that Teleport uses.

In order to know who we are controlling we need the know the IP range. One way to find this is to inspect a device connected with UniFi Teleport.

To do this, open the Network app and navigate to **Client Devices**. On this page you will find a list of all the clients and their IP address. Clients that are connected with UniFi Teleport will have the connection type of "VPN". In Figure 1 you can see I have two devices one with the IP "`192.168.2.3`" and "`192.168.2.2`", so, the subnet for this Teleport instance would be "`192.168.2.0/24`".

![](./Screenshot_2024-10-09_171911_-_Copy.png 'Figure 1. Screenshot of the client devices page showing two devices connected with UniFi Teleport.')

## Step 2. Create an IP group with the Teleport subnet

Open the Network app and navigate to, **Settings** > **Profiles** > **IP Groups**, then at the bottom of the table click **Create New**.

Then fill out options with the following options:

* Profile Name: (this can be whatever you want, I've called it "Teleport Users")
* Type: IPv4 Address/Subnet
* Address: (Use the subnet we found earlier, in my case its "`192.168.2.0/24`")

Then, press **Add** (to the right of the Address), and **Add** at the bottom of the page.

![](./Screenshot_2024-10-09_173413.png 'Figure 2. Screenshot of the IP Groups page showing the empty form to create a new IP group for Teleport users.')

## Step 3. Block Teleport from all VLANs

By default we should block Teleport from accessing all VLANs, then only allow the ones we Teleport to have.

To do this, open the Network app and navigate to **Settings** > **Security** > **Traffic & Firewall Rules** > **Advanced**. Scroll to the bottom, then press **Create Entry**.

Then fill out the form just like I have in Figure 3.
 
![](./Screenshot_2024-10-09_174411.png 'Figure 3. Screenshot of the firewall rule creation form showing the options to block Teleport users from accessing the LAN.')

You can change the name to be whatever you want, and use the same Address Group you made earlier.

## Step 4. Create an allowlist for Teleport.

To create an allowlist, create another IP group like we did Step 2, but instead of having the Teleport subnet, you should have all the IPs or subnets you want Teleport to have. For an example you can look at Figure 4.

![](./Screenshot_2024-10-09_184602.png 'Figure 4. Screenshot of the IP Groups page showing an IP group named "Teleport Allowlist" with two devices added to it.')

### Step 4.2. Create a firewall rule for the allowlist.

On the same page where we made the "Block Teleport users from LAN" rule, we should make another rule, by using a similar process like in Step 3. Then fill out the form like seen in Figure 5.

![](./Screenshot_2024-10-09_185409.png 'Figure 5. Screenshot of the firewall rule creation form showing the options to allow Teleport users to access only the IPs in the "Teleport Allowlist" IP group.')

You may call the rule what ever you want, and you must make sure to use the Address Groups we made earlier.

### Step 4.3. Move the allow rule above the block rule

All firewall rules are applied from the top to bottom, so if you have a block rule above an allow rule, then your block rule will take priority.
So we must make sure the allowlist rule is above our blocking rule.
To do this, you can grab the 6 dots icon next to the allow rule and move it above the block rule. If done successfully, it will appear like seen in Figure 6.

![](./Screenshot_2024-10-09_185848.png 'Figure 6. Screenshot of the firewall rules list showing the "Allow Teleport users to access defined" rule above the "Block Teleport users from LAN" rule.')
