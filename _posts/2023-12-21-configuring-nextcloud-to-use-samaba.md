---
date: '2023-12-21T14:03:02Z'
draft: false
title: 'Configuring Next Cloud to Use Samba'
tags: [Linux, Next Cloud, Authentication, Samba]
---

## Prerequisites

The following applications need to be installed on your system

- Next Cloud
- A Samba domain controller.

The guide will assume some details:

- Hostname: `ipa.minersonline.lan`
- Storage path: `/DATA/AppData/freeipa-server`
- Server IP: `10.0.0.97`

You may changes these assumptions based on your requirements.

## Steps

### 1. Step up a System User Account

The System User Account is a dedicated account that the Next Cloud instance will use to get user information from your Sa,ba server. Call the user `Next Cloudsystemuser`, and set a secure password and note it down.

If you have Windows clients connected to the domain then you can use the "Active Directory Users and Computers" program to add the user.

If not, you may need use the Samba command line tools.

### 2. Allow Next Cloud to accept any LDAP certificate

#### 1. Connect to your Next Cloud server's console

This depends on how you have installed Next Cloud.
For me:

```bash
sudo docker exec -it Next Cloud bash
```

#### 2. Edit LDAP configuration

Open the file `/etc/ldap/ldap.conf` and add the line to the bottom:

```text
TLS_REQCERT never
```

#### 3. Restart Next Cloud

You may need to restart your Next Cloud server.
For me:

```bash
sudo docker restart Next Cloud
```

### 3. Configure Next Cloud LDAP / AD Integration

#### 1. Enable / Install the "LDAP user and group backend" app

The "LDAP user and group backend" app is used to provide LDAP support for Next Cloud.

1. Go to the Next Cloud apps page and enable the "LDAP user and group backend" app. Optionally, I recommend installing the "Write support for LDAP" and the " LDAP Contacts Backend" app.

#### 2. Configure LDAP / AD connection settings

1. Open the "Administration Settings" page and go to the "LDAP / AD integration" page.

2. In the "Host" field enter your Samba server's hostname, for example: `ldaps://ipa.minersonline.lan`. If your running your Next Cloud in Docker then you may need to use the server's IP address instead.

3. Set the "Port" field to `636`.

4. Set the "User DN" to `cn=Next Cloudsystemuser,cn=users,dc=minersonline,dc=lan`

   > [!NOTE]
   > The `Next Cloudsystemuser` part is the user account we set earlier.
   >
   > The `dc=minersonline,dc=lan` part depends on your Samba realm domain. For example if your domain is `office.example.com` then you would use `dc=office,dc=example,dc=com`.

5. Set the "Password" to what you noted down earlier.

6. Then press "Save Credentials".

7. Set the "One Base DN per line" to `dc=minersonline,dc=lan`

   > [!NOTE]
   > Again, The `dc=minersonline,dc=lan` part depends on your Samba realm domain. For example if your domain is `office.example.com` then you would use `dc=office,dc=example,dc=com`.

8. Finally, press "Continue".

#### 3. Configure LDAP Groups

1. On the same page click on the "Groups" tab.

2. Click the "Edit LDAP Query" link.

3. In the "Edit LDAP Query" text box type: `(&(objectclass=group))`. This filter will add all Samba groups (even the default builtin ones).

#### 4. Configure LDAP Login Attributes

1. On the same page click on the "Login Attributes" tab.

2. Click the "Edit LDAP Query" link.

3. In the "Edit LDAP Query" text box type: `(&(objectclass=person))`.

4. Finally, press "Continue".

#### 5. Configure Advanced Settings

1. On the same page click on the "Advanced" tab.

2. Open up the "Directory Settings" section.

3. Inside the "User Display Name" type `displayName`.

4. Inside the "Base User Tree" type `cn=users,dc=minersonline,dc=lan`.

   > [!NOTE]
   > Again, The `dc=minersonline,dc=lan` part depends on your Samba realm domain. For example if your domain is `office.example.com` then you would use `dc=office,dc=example,dc=com`.

5. Inside the "Base Group Tree" type `cn=users,dc=minersonline,dc=lan`

   > [!NOTE]
   > Again, The `dc=minersonline,dc=lan` part depends on your Samba realm domain. For example if your domain is `office.example.com` then you would use `dc=office,dc=example,dc=com`.

6. Set the "Group-Member association" to `member (AD)`.

7. Open up the "Special Attributes" section.

8. Set the "User Home Folder Naming Rule" to `cn`.

9. Finally press "Test Configuration". If all settings are good then a "Valid configuration, connection established!" message should be displayed.