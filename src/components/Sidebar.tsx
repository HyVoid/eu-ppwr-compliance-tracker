import React from 'react';
import {
  LayoutDashboard,
  SlidersHorizontal,
  Boxes,
  Inbox,
  CheckSquare,
  AlertCircle,
  Award,
  ShieldCheck,
  CheckCircle2,
  Lock,
  X,
} from 'lucide-react';
import { ActiveTab } from './Header';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  unclosedGapsCount: number;
  blockedProductsCount: number;
  lastSaved: string;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  sheetCode: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  badgeType?: 'neutral' | 'danger';
}

interface NavSection {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  unclosedGapsCount,
  blockedProductsCount,
  lastSaved,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navSections: NavSection[] = [
    {
      group: 'OVERVIEW & COCKPIT',
      items: [
        {
          id: 'overview' as ActiveTab,
          label: 'Executive Overview',
          sheetCode: 'KPI',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      group: 'DATA & COMPLIANCE ENGINE',
      items: [
        {
          id: '01_params' as ActiveTab,
          label: 'Rules & Parameters',
          sheetCode: '01',
          icon: SlidersHorizontal,
        },
        {
          id: '02_master' as ActiveTab,
          label: 'Packaging Master Data',
          sheetCode: '02',
          icon: Boxes,
        },
        {
          id: '03_intake' as ActiveTab,
          label: 'Manufacturer Intake',
          sheetCode: '03',
          icon: Inbox,
        },
        {
          id: '04_audit' as ActiveTab,
          label: 'Evidence Audit Engine',
          sheetCode: '04',
          icon: CheckSquare,
        },
      ],
    },
    {
      group: 'ACTION & LEGAL DELIVERY',
      items: [
        {
          id: '05_gaps' as ActiveTab,
          label: 'Gap Action Log',
          sheetCode: '05',
          icon: AlertCircle,
          badge: unclosedGapsCount,
          badgeType: 'neutral',
        },
        {
          id: '06_doc' as ActiveTab,
          label: 'Delivery & DoC Index',
          sheetCode: '06',
          icon: Award,
          badge: blockedProductsCount > 0 ? blockedProductsCount : undefined,
          badgeType: 'danger',
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[rgba(5,28,44,0.4)] backdrop-blur-xs lg:hidden animate-fade-up"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[260px] bg-white border-r border-[var(--color-border)] flex flex-col justify-between select-none transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-[64px] px-5 flex items-center justify-between border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-300" />
              </div>
              <div className="min-w-0">
                <div className="font-heading font-semibold text-[15px] text-[var(--color-primary)] tracking-tight leading-tight truncate">
                  Theseus Workshop
                </div>
                <div className="text-[10px] text-[var(--color-muted)] font-mono leading-tight tracking-wider mt-0.5 truncate" title="PPWR Packaging Compliance">
                  PPWR Packaging Compliance
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-gray-400 hover:text-gray-600 p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="py-4 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)]">
            {navSections.map((sec) => (
              <div key={sec.group} className="space-y-1">
                <div className="px-3 text-[10px] font-semibold tracking-wider uppercase text-[var(--color-muted)] font-mono">
                  {sec.group}
                </div>
                <div className="space-y-0.5 mt-1.5">
                  {sec.items.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)] font-semibold shadow-xs'
                            : 'text-[var(--nav-text-inactive)] hover:text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.03)]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? 'text-[var(--color-accent)]' : 'text-gray-400'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge !== undefined && item.badge > 0 && (
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                                item.badgeType === 'danger'
                                  ? 'bg-[rgba(211,47,47,0.12)] text-[var(--color-negative)]'
                                  : 'bg-[rgba(5,28,44,0.08)] text-[var(--color-primary)]'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}

                          <span
                            className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                              isActive
                                ? 'bg-white text-[var(--color-accent)] border border-[rgba(34,81,255,0.2)]'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {item.sheetCode}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[rgba(5,28,44,0.015)] space-y-2">
          {/* Storage & Last Saved */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-positive)] shrink-0" />
              <span>Saved</span>
            </div>
            <span className="text-[var(--color-primary)] font-medium">{lastSaved}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-muted)] pt-1 border-t border-gray-100">
            <Lock className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
            <span>Local Storage Active</span>
          </div>
        </div>
      </aside>
    </>
  );
};
