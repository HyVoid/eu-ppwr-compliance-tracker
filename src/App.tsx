import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  AppState,
  GlobalParameters,
  PPWRRule,
  PackagingComponentMaster,
  ManufacturerDataIntake,
  ExpertAuditRecord,
  ComplianceGap,
  DeliveryProduct,
} from './types/ppwr';
import {
  loadStateFromStorage,
  saveStateToStorage,
  exportBackupJson,
  parseBackupFile,
} from './utils/storage';
import { getInitialAppState } from './data/initialData';
import {
  computeRules,
  computeMasterComponents,
  computeIntakes,
  computeEvidenceChecks,
  computeGaps,
  computeDeliveries,
  computeTopUrgentGaps,
} from './utils/calculations';

// Components
import { ActiveTab } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { Sheet01Parameters } from './components/sheets/Sheet01Parameters';
import { Sheet02MasterData } from './components/sheets/Sheet02MasterData';
import { Sheet03DataIntake } from './components/sheets/Sheet03DataIntake';
import { Sheet04EvidenceCheck } from './components/sheets/Sheet04EvidenceCheck';
import { Sheet05GapLog } from './components/sheets/Sheet05GapLog';
import { Sheet06DocIndex } from './components/sheets/Sheet06DocIndex';
import { BulkImportModal } from './components/BulkImportModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';

export default function App() {
  const [appState, setAppState] = useState<AppState>(() => loadStateFromStorage());
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Helper to commit state changes & auto-save to localStorage
  const updateState = useCallback((updater: (prev: AppState) => AppState) => {
    setAppState((prev) => {
      const next = updater(prev);
      const savedTime = saveStateToStorage(next);
      return {
        ...next,
        lastSaved: savedTime,
      };
    });
  }, []);

  // Reactive Calculation Pipeline (Excel formula emulation)
  const computedRules = useMemo(() => {
    return computeRules(appState.rules, appState.parameters, appState.masterComponents);
  }, [appState.rules, appState.parameters, appState.masterComponents]);

  const computedComponents = useMemo(() => {
    return computeMasterComponents(appState.masterComponents, computedRules, appState.manufacturerIntakes);
  }, [appState.masterComponents, computedRules, appState.manufacturerIntakes]);

  const computedIntakes = useMemo(() => {
    return computeIntakes(appState.manufacturerIntakes, appState.masterComponents, appState.parameters);
  }, [appState.manufacturerIntakes, appState.masterComponents, appState.parameters]);

  const computedChecks = useMemo(() => {
    return computeEvidenceChecks(appState.masterComponents, computedIntakes, appState.expertAudits, appState.parameters);
  }, [appState.masterComponents, computedIntakes, appState.expertAudits, appState.parameters]);

  const computedGaps = useMemo(() => {
    return computeGaps(appState.gaps, appState.masterComponents, appState.rules, appState.parameters);
  }, [appState.gaps, appState.masterComponents, appState.rules, appState.parameters]);

  const computedDeliveries = useMemo(() => {
    return computeDeliveries(
      appState.deliveries,
      appState.masterComponents,
      computedChecks,
      computedGaps,
      computedIntakes,
      appState.parameters
    );
  }, [appState.deliveries, appState.masterComponents, computedChecks, computedGaps, computedIntakes, appState.parameters]);

  const topUrgentGaps = useMemo(() => {
    return computeTopUrgentGaps(computedGaps);
  }, [computedGaps]);

  // Synchronize title and header badges
  const unclosedGapsCount = useMemo(() => {
    return computedGaps.filter((g) => g.expertResolutionStatus !== 'Closed & Verified').length;
  }, [computedGaps]);

  const blockedProductsCount = useMemo(() => {
    return computedDeliveries.filter((d) => d.isBlockedByInterlock).length;
  }, [computedDeliveries]);

  // --- Handlers for Sheet 01 (Parameters & Rules) ---
  const handleUpdateParameters = (newParams: Partial<GlobalParameters>) => {
    updateState((prev) => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        ...newParams,
      },
    }));
  };

  const handleUpdateRule = (ruleId: string, updated: Partial<PPWRRule>) => {
    updateState((prev) => ({
      ...prev,
      rules: prev.rules.map((r) => (r.ruleId === ruleId ? { ...r, ...updated } : r)),
    }));
  };

  const handleAddRule = (rule: PPWRRule) => {
    updateState((prev) => ({
      ...prev,
      rules: [...prev.rules, rule],
    }));
    showNotification(`Rule ${rule.ruleId} registered successfully`);
  };

  // --- Handlers for Sheet 02 (Master Components) ---
  const handleUpdateComponent = (componentId: string, updated: Partial<PackagingComponentMaster>) => {
    updateState((prev) => ({
      ...prev,
      masterComponents: prev.masterComponents.map((c) =>
        c.componentId === componentId ? { ...c, ...updated } : c
      ),
    }));
  };

  const handleAddComponent = (comp: PackagingComponentMaster) => {
    updateState((prev) => ({
      ...prev,
      masterComponents: [...prev.masterComponents, comp],
    }));
    showNotification(`Component ${comp.componentId} registered`);
  };

  const handleDeleteComponent = (componentId: string) => {
    updateState((prev) => ({
      ...prev,
      masterComponents: prev.masterComponents.filter((c) => c.componentId !== componentId),
      manufacturerIntakes: prev.manufacturerIntakes.filter((i) => i.componentId !== componentId),
      expertAudits: prev.expertAudits.filter((a) => a.componentId !== componentId),
      gaps: prev.gaps.filter((g) => g.componentId !== componentId),
    }));
    showNotification(`Component ${componentId} deleted`);
  };

  // --- Handlers for Sheet 03 (Manufacturer Intake) ---
  const handleUpdateIntake = (recordId: string, updated: Partial<ManufacturerDataIntake>) => {
    updateState((prev) => ({
      ...prev,
      manufacturerIntakes: prev.manufacturerIntakes.map((i) =>
        i.recordId === recordId ? { ...i, ...updated } : i
      ),
    }));
  };

  const handleAddIntake = (intake: ManufacturerDataIntake) => {
    updateState((prev) => ({
      ...prev,
      manufacturerIntakes: [...prev.manufacturerIntakes, intake],
    }));
    showNotification(`Intake record ${intake.recordId} added`);
  };

  const handleDeleteIntake = (recordId: string) => {
    updateState((prev) => ({
      ...prev,
      manufacturerIntakes: prev.manufacturerIntakes.filter((i) => i.recordId !== recordId),
    }));
    showNotification(`Intake record ${recordId} removed`);
  };

  // --- Handlers for Sheet 04 (Expert Evidence Audit) ---
  const handleUpdateAudit = (componentId: string, updated: Partial<ExpertAuditRecord>) => {
    updateState((prev) => {
      const exists = prev.expertAudits.some((a) => a.componentId === componentId);
      let newAudits: ExpertAuditRecord[];
      if (exists) {
        newAudits = prev.expertAudits.map((a) =>
          a.componentId === componentId ? { ...a, ...updated } : a
        );
      } else {
        newAudits = [
          ...prev.expertAudits,
          {
            componentId,
            expertConclusion: updated.expertConclusion || 'Pending Review',
            auditRuleVersion: updated.auditRuleVersion || prev.parameters.activeRuleVersion,
            auditorNameDate: updated.auditorNameDate || '',
            expertNotes: updated.expertNotes || '',
          },
        ];
      }
      return {
        ...prev,
        expertAudits: newAudits,
      };
    });
  };

  // --- Handlers for Sheet 05 (Compliance Gaps) ---
  const handleUpdateGap = (gapId: string, updated: Partial<ComplianceGap>) => {
    updateState((prev) => ({
      ...prev,
      gaps: prev.gaps.map((g) => (g.gapId === gapId ? { ...g, ...updated } : g)),
    }));
  };

  const handleAddGap = (gap: ComplianceGap) => {
    updateState((prev) => ({
      ...prev,
      gaps: [...prev.gaps, gap],
    }));
    showNotification(`Gap ${gap.gapId} logged`);
  };

  const handleDeleteGap = (gapId: string) => {
    updateState((prev) => ({
      ...prev,
      gaps: prev.gaps.filter((g) => g.gapId !== gapId),
    }));
    showNotification(`Gap ${gapId} deleted`);
  };

  // --- Handlers for Sheet 06 (Delivery Products) ---
  const handleUpdateDelivery = (productId: string, updated: Partial<DeliveryProduct>) => {
    updateState((prev) => ({
      ...prev,
      deliveries: prev.deliveries.map((d) =>
        d.productId === productId ? { ...d, ...updated } : d
      ),
    }));
  };

  // --- Backup Export / Import / Reset ---
  const handleExportBackup = () => {
    exportBackupJson(appState);
    showNotification('Backup JSON exported successfully');
  };

  const handleImportBackup = async (file: File) => {
    try {
      const parsed = await parseBackupFile(file);
      setAppState(parsed);
      saveStateToStorage(parsed);
      showNotification('Backup state restored successfully');
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Failed to import backup', 'error');
    }
  };

  const handleResetData = () => {
    const initial = getInitialAppState();
    setAppState(initial);
    saveStateToStorage(initial);
    showNotification('Application data reset to demonstration defaults');
  };

  // --- Bulk CSV Imports ---
  const handleBulkImportMaster = (items: PackagingComponentMaster[], mode: 'append' | 'replace') => {
    updateState((prev) => ({
      ...prev,
      masterComponents: mode === 'replace' ? items : [...prev.masterComponents, ...items],
    }));
    showNotification(`Imported ${items.length} master components`);
  };

  const handleBulkImportIntakes = (items: ManufacturerDataIntake[], mode: 'append' | 'replace') => {
    updateState((prev) => ({
      ...prev,
      manufacturerIntakes: mode === 'replace' ? items : [...prev.manufacturerIntakes, ...items],
    }));
    showNotification(`Imported ${items.length} intake records`);
  };

  const handleBulkImportGaps = (items: ComplianceGap[], mode: 'append' | 'replace') => {
    updateState((prev) => ({
      ...prev,
      gaps: mode === 'replace' ? items : [...prev.gaps, ...items],
    }));
    showNotification(`Imported ${items.length} gap action items`);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex font-body selection:bg-blue-100">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg text-[13px] font-medium shadow-lg transition-all animate-fade-up ${
            notification.type === 'error'
              ? 'bg-[var(--color-negative)] text-white'
              : 'bg-[var(--color-primary)] text-white'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unclosedGapsCount={unclosedGapsCount}
        blockedProductsCount={blockedProductsCount}
        lastSaved={appState.lastSaved}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (with margin/padding for fixed sidebar on desktop) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px]">
        {/* Top Header / Breadcrumb Bar */}
        <TopBar
          activeTab={activeTab}
          lastSaved={appState.lastSaved}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onExportBackup={handleExportBackup}
          onImportBackup={handleImportBackup}
          onOpenBulkImport={() => setIsBulkImportOpen(true)}
          onResetData={() => setIsResetConfirmOpen(true)}
        />

        {/* Viewport Content (1400px centered max-width, 40px padding) */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-10 py-8">
          {activeTab === 'overview' && (
            <ExecutiveSummary
              computedDeliveries={computedDeliveries}
              computedGaps={computedGaps}
              computedComponents={computedComponents}
              parameters={appState.parameters}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === '01_params' && (
            <Sheet01Parameters
              parameters={appState.parameters}
              onUpdateParameters={handleUpdateParameters}
              computedRules={computedRules}
              onUpdateRule={handleUpdateRule}
              onAddRule={handleAddRule}
            />
          )}

          {activeTab === '02_master' && (
            <Sheet02MasterData
              computedComponents={computedComponents}
              onUpdateComponent={handleUpdateComponent}
              onAddComponent={handleAddComponent}
              onDeleteComponent={handleDeleteComponent}
            />
          )}

          {activeTab === '03_intake' && (
            <Sheet03DataIntake
              computedIntakes={computedIntakes}
              parameters={appState.parameters}
              onUpdateIntake={handleUpdateIntake}
              onAddIntake={handleAddIntake}
              onDeleteIntake={handleDeleteIntake}
            />
          )}

          {activeTab === '04_audit' && (
            <Sheet04EvidenceCheck
              computedChecks={computedChecks}
              parameters={appState.parameters}
              onUpdateAudit={handleUpdateAudit}
            />
          )}

          {activeTab === '05_gaps' && (
            <Sheet05GapLog
              computedGaps={computedGaps}
              parameters={appState.parameters}
              onUpdateGap={handleUpdateGap}
              onAddGap={handleAddGap}
              onDeleteGap={handleDeleteGap}
            />
          )}

          {activeTab === '06_doc' && (
            <Sheet06DocIndex
              computedDeliveries={computedDeliveries}
              topUrgentGaps={topUrgentGaps}
              parameters={appState.parameters}
              onUpdateDelivery={handleUpdateDelivery}
              onSelectTab={setActiveTab}
            />
          )}
        </main>

        {/* Bottom Privacy & Metadata Footer */}
        <Footer />
      </div>

      {/* Bulk CSV Import Modal */}
      <BulkImportModal
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onImportMaster={handleBulkImportMaster}
        onImportIntakes={handleBulkImportIntakes}
        onImportGaps={handleBulkImportGaps}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetData}
      />
    </div>
  );
}
