import { LinksGroup, UserButton } from '@boilerplate-project/ui-lib';
import { Navbar, Group, Code, ScrollArea, createStyles } from '@mantine/core';
import { getModules } from 'packages/dashboard/lib/useAccess';
import { useEffect, useState } from 'react';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconAperture as Logo,
} from '@tabler/icons';

const mockdata = [
  { label: 'Dashboard', key: 'dashboard', icon: IconGauge, link: '/' },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', key: 'market-overview', link: '/' },
      { label: 'Forecasts', key: 'market-forecast', link: '/' },
      { label: 'Outlook', key: 'market-outlook', link: '/' },
      { label: 'Real time', key: 'market-realtime', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      {
        label: 'Upcoming releases',
        key: 'releases-upcoming',
        link: '/releases/upcoming',
      },
      { label: 'Previous releases', key: 'releases-previous', link: '/' },
      { label: 'Releases schedule', key: 'releases-schedule', link: '/' },
    ],
  },
  {
    label: 'Analytics',
    key: 'analytics',
    icon: IconPresentationAnalytics,
    link: '/',
  },
  {
    label: 'Contracts',
    key: 'contracts',
    icon: IconFileAnalytics,
    link: '/',
  },
  { label: 'Settings', key: 'settings', icon: IconAdjustments, link: '/' },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', key: 'security-2fa', link: '/' },
      { label: 'Change password', key: 'security-password', link: '/' },
      { label: 'Recovery codes', key: 'security-recovery', link: '/' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function NavbarNested() {
  const { classes } = useStyles();
  const modules = getModules();
  const [listMenu, setListMenu] = useState(null);
  const [links, setLinks] = useState(null);
  useEffect(() => {
    if (modules?.length > 0) {
      const modulesSlugs = modules?.map((e) => e.slug) || [];
      if (modulesSlugs.length > 0) {
        let menus = [];
        mockdata.map((menu) => {
          if (menu.links) {
            const submenus = menu.links.filter((submenu) =>
              modulesSlugs.includes(submenu.key)
            );
            if (submenus.length > 0) {
              menu.links = submenus;
              menus.push(menu);
            }
          } else if (modulesSlugs.includes(menu.key)) {
            menus.push(menu);
          }
        });
        setListMenu(menus);
      }
    }
  }, [modules]);
  useEffect(() => {
    if (listMenu) {
      const Links = listMenu?.map((item) => (
        <LinksGroup {...item} key={item.label} />
      ));
      setLinks(Links);
    }
  }, [listMenu]);
  return (
    <Navbar
      height={'100vh'}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Logo width={40} height={40} />
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        />
      </Navbar.Section>
    </Navbar>
  );
}
