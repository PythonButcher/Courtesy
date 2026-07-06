import { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import EventIcon from '@mui/icons-material/Event';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import DescriptionIcon from '@mui/icons-material/Description';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface SidebarProps {
  activeNav: string;
  onNavigate: (view: string) => void;
}

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview', icon: <DashboardIcon /> },
  { key: 'cases', label: 'Cases', icon: <GavelIcon /> },
  { key: 'hearings', label: 'Hearings', icon: <EventIcon /> },
  { key: 'deadlines', label: 'Deadlines', icon: <AssignmentLateIcon /> },
  { key: 'documents', label: 'Documents', icon: <DescriptionIcon /> },
  { key: 'decision-prep', label: 'Decision Prep', icon: <PsychologyIcon /> },
];

/**
 * Sidebar Navigation
 *
 * Left sidebar with main navigation items for the court workspace.
 */
export function Sidebar({ activeNav, onNavigate }: SidebarProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('courtesy_sidebar_collapsed');
    return saved === 'true';
  });

  useEffect(() => {
    if (isTablet) setIsCollapsed(true);
  }, [isTablet]);

  const handleToggle = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    localStorage.setItem('courtesy_sidebar_collapsed', String(newValue));
  };

  const width = isMobile ? 64 : isCollapsed ? 64 : 220;

  return (
    <Box
      sx={{
        width,
        minWidth: width,
        backgroundColor: 'background.default',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'width 0.2s ease',
        overflow: 'hidden'
      }}
    >
      {/* Logo / App Title */}
      <Box
        sx={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          px: isCollapsed ? 1 : 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {!isCollapsed && (
          <Typography
            variant="h2"
            sx={{
              color: 'primary.light',
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              fontWeight: 700,
            }}
          >
            Courtesy
          </Typography>
        )}
        {!isMobile && (
          <IconButton size="small" onClick={handleToggle} sx={{ color: 'text.secondary' }}>
            {isCollapsed ? <MenuIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
        )}
      </Box>

      {/* Primary Navigation */}
      <List sx={{ px: 1, py: 2, flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.key;
          const content = (
            <ListItemButton
              key={item.key}
              onClick={() => onNavigate(item.key)}
              sx={{
                borderRadius: 0,
                mb: 0,
                py: 1.25,
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                px: isCollapsed ? 1 : 2.5,
                borderLeft: '3px solid',
                borderColor: isActive ? 'primary.main' : 'transparent',
                backgroundColor: isActive ? 'rgba(92, 138, 255, 0.05)' : 'transparent',
                color: isActive ? 'primary.light' : 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  color: isActive ? 'primary.light' : 'text.primary',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 1.5,
                  color: 'inherit',
                  '& svg': { fontSize: 20 },
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              )}
            </ListItemButton>
          );

          return isCollapsed ? (
            <Tooltip title={item.label} placement="right" key={item.key}>
              {content}
            </Tooltip>
          ) : content;
        })}
      </List>

      <Divider />

      {/* Bottom Settings */}
      <List sx={{ px: 1, py: 2 }}>
        <Tooltip title={isCollapsed ? "Settings" : ""} placement="right">
          <ListItemButton
            onClick={() => onNavigate('settings')}
            sx={{
              borderRadius: 0,
              py: 1.25,
              borderLeft: '3px solid transparent',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              px: isCollapsed ? 1 : 2.5,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.03)',
                color: 'text.primary',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 1.5,
                color: 'inherit',
                '& svg': { fontSize: 20 },
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </List>
    </Box>
  );
}
