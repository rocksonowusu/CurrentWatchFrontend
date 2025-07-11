// styles/components/logComponentStyles.ts
import { StyleSheet } from 'react-native';

export const logComponentStyles = StyleSheet.create({
 summaryContainer: {
  margin: 16,
  marginBottom: 8,
},
summaryHeader: {
  paddingVertical:20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 20,
},
summaryTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#1F2937',
  paddingBottom: 0,
},
summarySubtitle: {
  fontSize: 14,
  color: '#6B7280',
  fontWeight: '500',
},
summaryBadge: {
  backgroundColor: '#ECFDF5',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#10B981',
},
summaryBadgeText: {
  fontSize: 12,
  fontWeight: '600',
  color: '#10B981',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
},

// Critical Issues Section
criticalSection: {
  marginBottom: 20,
},
criticalTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1F2937',
  marginBottom: 12,
},
criticalGrid: {
  flexDirection: 'row',
  gap: 12,
},
criticalCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 16,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
  borderWidth: 1,
  borderColor: '#F3F4F6',
  paddingTop:10
},
criticalIcon: {
  fontSize: 24,
  marginRight: 12,
},
criticalContent: {
  flex: 1,
},
criticalValue: {
  fontSize: 20,
  fontWeight: '800',
  marginBottom: 2,
},
criticalLabel: {
  fontSize: 12,
  color: '#6B7280',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
},

// Stats Row - Compact
statsRow: {
  flexDirection: 'row',
  backgroundColor: '#F9FAFB',
  borderRadius: 12,
  padding: 16,
  justifyContent: 'space-around',
  borderWidth: 1,
  borderColor: '#F3F4F6',
},
statItem: {
  alignItems: 'center',
},
statValue: {
  fontSize: 18,
  fontWeight: '700',
  color: '#1F2937',
  marginBottom: 4,
},
statLabel: {
  fontSize: 11,
  color: '#6B7280',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
},

  // LogFilter styles
  filterContainer: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  filterScrollView: {
    flexGrow: 0,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textTransform: 'capitalize',
  },

  // LogsList styles
  logsListContainer: {
    margin: 16,
    marginTop: 8,
  },
  logGroup: {
    marginBottom: 24,
  },
  logGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    marginLeft: 4,
  },

  // LogItem styles
  logItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  logItemHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  logItemLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  logIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logIcon: {
    fontSize: 16,
  },
  logContent: {
    flex: 1,
  },
  logMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  logMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  logMetaSeparator: {
    fontSize: 12,
    color: '#D1D5DB',
    marginHorizontal: 6,
  },
  roomTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  roomTagText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
  },
  logDetails: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  logTypeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
  },

  // EmptyState styles
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  dropdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  dropdownContainer: {
    flex: 1,
    minWidth: '30%',
  },
  dropdownLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dropdownButton: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonOpen: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textTransform: 'capitalize',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#9CA3AF',
    transform: [{ rotate: '0deg' }],
  },
  dropdownArrowOpen: {
    transform: [{ rotate: '180deg' }],
    color: '#10B981',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: 300,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  dropdownOption: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownOptionSelected: {
    backgroundColor: '#F0FDF4',
  },
  dropdownOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownOptionIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  dropdownOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textTransform: 'capitalize',
  },
  dropdownOptionTextSelected: {
    color: '#10B981',
    fontWeight: '600',
  },
  dropdownCheckmark: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
  },
});