import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import EventIcon from '@mui/icons-material/Event';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import DescriptionIcon from '@mui/icons-material/Description';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';

interface SidebarProps {
  activeNav: string;
  onNavigate: (view: string) => void;
}

const NAV_ITEMS = [
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
  return (
    <Box
      sx={{
        width: 220,
        minWidth: 220,
        backgroundColor: '#0d1117',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Logo / App Title */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #5c8aff 0%, #7c5cbf 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          C
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontSize: '1.1rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #5c8aff, #a88ae0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.01em',
          }}
        >
          Courtesy
        </Typography>
      </Box>

      <Divider sx={{ mx: 1.5 }} />

      {/* Navigation Items */}
      <List sx={{ flex: 1, py: 1 }}>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.key}
            selected={activeNav === item.key}
            onClick={() => onNavigate(item.key)}
            sx={{ py: 1 }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: activeNav === item.key ? 'primary.main' : 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.85rem',
                fontWeight: activeNav === item.key ? 600 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Bottom Settings */}
      <List sx={{ pb: 1 }}>
        <Divider sx={{ mx: 1.5, mb: 1 }} />
        <ListItemButton
          selected={activeNav === 'settings'}
          onClick={() => onNavigate('settings')}
          sx={{ py: 1 }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{ fontSize: '0.85rem' }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
